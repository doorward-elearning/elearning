import { Injectable } from '@nestjs/common';
import UserEntity from '../../database/entities/user.entity';
import { UsersRepository } from './users.repository';

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
   */
  async findByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      username,
    });
  }
}
