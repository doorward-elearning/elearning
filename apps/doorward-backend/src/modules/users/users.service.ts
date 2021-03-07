import { BadRequestException, Injectable } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { FindOneOptions } from 'typeorm';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import { RolesService } from '../roles/roles.service';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import _ from 'lodash';
import Tools from '@doorward/common/utils/Tools';
import PasswordResetsRepository from '@doorward/backend/repositories/password.resets.repository';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import ForgotPasswordEmail from '../../emails/forgot.password.email';
import PrivilegeRepository from '@doorward/backend/repositories/privilege.repository';
import { UserStatus } from '@doorward/common/types/users';
import {
  ForgotPasswordBody,
  RegisterBody,
  ResetPasswordBody,
  UpdatePasswordBody,
} from '@doorward/common/dtos/body/auth.body';
import { CreateUserBody, UpdateAccountBody, UpdateProfilePictureBody } from '@doorward/common/dtos/body';
import { UserResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import { FilesService } from '../files/files.service';
import ROUTES from '@doorward/common/frontend/routes/main';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesService: RolesService,
    private passwordResetsRepository: PasswordResetsRepository,
    private emailsService: EmailsService,
    private privilegeRepository: PrivilegeRepository,
    private filesService: FilesService
  ) {}

  async getUserDetails(id?: string, username?: string): Promise<UserEntity> {
    const where = id ? { id } : { username };

    if (!username && !id) {
      throw new Error('Neither id nor username is specified.');
    }

    const user = await this.usersRepository.findOne({
      where,
      relations: ['organization', 'role', 'role.privileges'],
    });

    user.role.privileges = await this.privilegeRepository
      .createQueryBuilder('privilege')
      .leftJoin('RolePrivileges', 'rolePrivilege', 'privilege.id = "rolePrivilege"."privilegeId"')
      .where('"rolePrivilege"."roleId" = :roleId', { roleId: user.role.id })
      .getMany();

    return user;
  }
  /**
   * Retrieve all users
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async registerUser(userBody: RegisterBody): Promise<UserEntity> {
    const { user } = await this.createUser(userBody as CreateUserBody);
    return user;
  }

  async createUser(
    body: CreateUserBody,
    currentUser?: UserEntity
  ): Promise<{ user: UserEntity; resetToken: string | null }> {
    const existingUser = await this.usersRepository.userExistsByUsername(body.username);
    if (existingUser) {
      throw new ValidationException({ username: translate('userWithUsernameAlreadyExists') });
    }
    const { role, status = UserStatus.PENDING_ACTIVATION, ...userBody } = body;

    const user = this.usersRepository.create({
      status,
      ...userBody,
      firstName: userBody.firstName || '',
      lastName: userBody.lastName || '',
      createdBy: currentUser,
    });
    user.role = role ? await this.rolesService.get(role) : await this.rolesService.student();

    let resetToken = null;
    if (user.password) {
      user.password = PasswordUtils.hashPassword(user.password);
    }

    const createdUser = await this.usersRepository.save(user);

    if (!user.password) {
      resetToken = Tools.randomString(50);
      await this.passwordResetsRepository.save(
        this.passwordResetsRepository.create({
          token: resetToken,
          user: createdUser,
        })
      );
    }
    return {
      user: createdUser,
      resetToken,
    };
  }

  /**
   * Retrieve a user by their username
   * @param username
   * @param options
   */
  async findByUsername(username: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    const user = await this.usersRepository.userExistsByUsername(username);
    return user ? this.usersRepository.findOne(user.id, options) : null;
  }

  async findById(id: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOne(id, options);
  }

  async updateAccountProfilePicture(body: UpdateProfilePictureBody, user: UserEntity): Promise<UserResponse> {
    const file = await this.filesService.getFileById(body.profilePictureId);

    if (file) {
      await this.usersRepository.save({
        ...user,
        profilePicture: file.publicUrl,
        profilePictureFileId: body.profilePictureId,
      });
    }

    user = await this.usersRepository.findOne(user.id);

    return { user };
  }

  async updateAccountDetails(body: UpdateAccountBody, user: UserEntity): Promise<UserResponse> {
    if (body.username !== user.username) {
      if (await this.usersRepository.userExistsByUsername(body.username)) {
        throw new ValidationException({ username: 'This username is already in use.' });
      }
    }
    const update = _.pickBy(body, _.identity);

    await this.usersRepository.save({ ...user, ...update });
    user = await this.usersRepository.findOne(user.id);

    return { user };
  }

  /**
   * Update the user's password.
   *
   * @param body
   * @param user
   */
  async updateAccountPassword(body: UpdatePasswordBody, user: UserEntity): Promise<void> {
    if (user.validatePassword(body.password)) {
      user.password = PasswordUtils.hashPassword(body.newPassword);
      await this.usersRepository.save(user);
    } else {
      throw new ValidationException({ password: 'Wrong password' });
    }
  }

  /**
   * Resets or sets a user's password.
   * @param body
   */
  async resetAccountPassword(body: ResetPasswordBody): Promise<boolean> {
    const { resetToken } = body;
    if (resetToken) {
      const passwordReset = await this.passwordResetsRepository.findOne(
        {
          token: resetToken,
        },
        { relations: ['user'] }
      );

      const user = passwordReset.user;
      const hadPassword = !!user.password;

      if (!passwordReset || !user) {
        throw new BadRequestException('The password reset token is invalid.');
      } else {
        await this.usersRepository.update(user.id, { password: PasswordUtils.hashPassword(body.password) });
        await this.passwordResetsRepository.softRemove(passwordReset);

        return hadPassword;
      }
    }
  }

  async userForgotPassword(body: ForgotPasswordBody, origin: string) {
    const user = await this.usersRepository.userExistsByUsername(body.username);
    if (!user) {
      throw new ValidationException({ username: 'No {{user}} with this username exists.' });
    }

    const resetToken = Tools.randomString(50);

    // create the password reset link
    await this.passwordResetsRepository.save(
      this.passwordResetsRepository.create({
        token: resetToken,
        user,
      })
    );

    this.emailsService
      .send(
        new ForgotPasswordEmail({
          subject: translate('forgotPassword'),
          data: {
            link: origin + Tools.createRoute(ROUTES.auth.password.reset, { resetToken }),
          },
          recipient: user,
        })
      )
      .then();
  }
}
