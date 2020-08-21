import { Injectable } from '@nestjs/common';
import UserEntity from '../../database/entities/user.entity';
import { UsersRepository } from './users.repository';
import { FindOneOptions } from 'typeorm';
import RegisterBody from '@doorward/common/dtos/register.body';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository, private rolesService: RolesService) {}

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
      role: await this.rolesService.student(),
    });

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
}
