import { Injectable } from '@nestjs/common';
import UserEntity from '../../database/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import LoginResponse from './dtos/login.response';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  /**
   * Validate that a user with this username and password exists.
   *
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<UserEntity | undefined> {
    const user = await this.usersService.findByUsername(username, {
      relations: ['organization'],
    });

    if (user && user.validatePassword(password)) {
      return user;
    }
  }

  async login(user: UserEntity): Promise<LoginResponse> {
    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role,
    };

    const token = await this.jwtService.sign(payload);

    return {
      token,
      user,
    };
  }
}
