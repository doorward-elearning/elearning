import { Injectable } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersRepository } from './users.repository';
import { FindOneOptions } from 'typeorm';
import RegisterBody from '@doorward/common/dtos/register.body';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import { RolesService } from '../roles/roles.service';
import UpdateAccountBody from '@doorward/common/dtos/update.account.body';
import UserResponse from '@doorward/common/dtos/user.response';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository, private rolesService: RolesService) {}

  async getUserDetails(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id, {
      relations: ['organization', 'role'],
    });
  }
  /**
   * Retrieve all users
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async registerUser(userBody: RegisterBody): Promise<UserEntity> {
    const user = this.usersRepository.create({
      firstName: '',
      lastName: '',
      ...userBody,
    });
    user.role = await this.rolesService.student();
    console.log(user);

    if (user.password) {
      user.password = PasswordUtils.hashPassword(user.password);
    }

    return this.usersRepository.save(user);
  }

  /**
   * Retrieve a user by their username
   * @param username
   * @param options
   */
  async findByUsername(username: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOne(
      {
        username,
      },
      options
    );
  }

  async findById(id: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOne(id, options);
  }

  async updateAccountDetails(body: UpdateAccountBody, user: UserEntity): Promise<UserResponse> {
    if (body.username !== user.username) {
      if (
        await this.usersRepository.findOne({
          username: body.username,
        })
      ) {
        throw new ValidationException({ username: 'This username is already in use.' });
      }
    }
    const update = _.pickBy(body, _.identity);

    await this.usersRepository.save({ ...user, ...update });
    user = await this.usersRepository.findOne(user.id);

    return { user };
  }
}
