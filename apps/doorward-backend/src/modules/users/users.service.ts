import { Injectable } from '@nestjs/common';
import UserEntity from '../../database/entities/user.entity';
import { UsersRepository } from './users.repository';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   * Retrieve all users
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
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
