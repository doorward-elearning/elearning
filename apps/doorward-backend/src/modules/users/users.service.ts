import { Injectable } from '@nestjs/common';
import UserEntity from '../../database/entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<UserEntity> {
    return this.usersRepository.findOne();
  }
}
