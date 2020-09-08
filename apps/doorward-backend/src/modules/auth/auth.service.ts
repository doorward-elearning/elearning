import { Injectable } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import LoginResponse from '@doorward/common/dtos/login.response';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import RegisterBody from '@doorward/common/dtos/register.body';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

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
      throw new ValidationException({ username: 'User with this username does not exist.' });
    }

    if (!user.password) {
      throw new ValidationException({ password: 'Your password has not been set.' });
    }

    if (user.validatePassword(password)) {
      return user;
    } else {
      throw new ValidationException({ password: 'Wrong password.' });
    }
  }

  async register(body: RegisterBody): Promise<LoginResponse> {
    const userExistsByUsername = await this.usersService.findByUsername(body.username);
    if (userExistsByUsername) {
      throw new ValidationException({
        username: 'This username is already in use.',
      });
    }
    const user = await this.usersService.registerUser(body);

    return this.login(user);
  }

  async login(user: UserEntity): Promise<LoginResponse> {
    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role,
    };

    await user.updatePrivileges();

    const token = await this.jwtService.sign(payload);

    return {
      token,
      user,
      message: 'Login successful',
    };
  }
}
