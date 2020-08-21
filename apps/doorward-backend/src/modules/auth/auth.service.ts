import { Injectable } from '@nestjs/common';
import UserEntity from '../../database/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.usersService.findByUsername(username);

    if (user && user.validatePassword(password)) {
      return user;
    }
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, id: user.id };

    return this.jwtService.sign(payload);
  }
}
