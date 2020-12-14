import { Injectable } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { LoginResponse } from '@doorward/common/dtos/response/auth.responses';
import { ForceChangePasswordBody, RegisterBody } from '@doorward/common/dtos/body/auth.body';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import PasswordChangeEmail from '../../emails/password-change.email';
import translate from '@doorward/common/lang/translate';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailsService
  ) {}

  /**
   * Retrieve the current user details
   *
   * @param id
   */
  async getCurrentUser(id: string): Promise<UserEntity> {
    return this.usersService.getUserDetails(id);
  }

  /**
   * Validate that a user with this username and password exists.
   *
   * @param username
   * @param password
   */
  async validateUserLogin(username: string, password: string): Promise<UserEntity | undefined> {
    const user = await this.usersService.findByUsername(username, {
      relations: ['organization'],
    });

    if (!user) {
      throw new ValidationException({ username: translate('userWithUsernameDoesNotExist') });
    }

    if (!user.password) {
      throw new ValidationException({ password: translate('yourPasswordHasNotBeenSet') });
    }

    if (user.validatePassword(password)) {
      return user;
    } else {
      throw new ValidationException({ password: 'Wrong password.' });
    }
  }

  async register(body: RegisterBody): Promise<LoginResponse> {
    const user = await this.usersService.registerUser(body);

    return this.login(user);
  }

  async login(user: UserEntity): Promise<LoginResponse> {
    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role.id,
    };

    await user.updatePrivileges();

    const token = await this.jwtService.sign(payload);

    return {
      token,
      user,
      message: 'Login successful',
    };
  }

  sendPasswordChangedEmail(user: UserEntity, body: ForceChangePasswordBody) {
    this.emailService
      .send(
        new PasswordChangeEmail({
          subject: 'Password changed',
          recipient: user,
          data: body,
        })
      )
      .then();
  }
}
