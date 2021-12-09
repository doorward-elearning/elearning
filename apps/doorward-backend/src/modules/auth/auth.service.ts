import { Inject, Injectable } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '@doorward/common/dtos/response/auth.responses';
import { ForceChangePasswordBody, RegisterBody } from '@doorward/common/dtos/body/auth.body';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import PasswordChangeEmail from '../../emails/password-change.email';
import { ORGANIZATION_CONNECTION } from '@doorward/backend/constants';
import { Connection } from 'typeorm';
import { UserSessionRepository } from '@doorward/backend/repositories/user.session.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ORGANIZATION_CONNECTION) private connection: Connection,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailsService,
    private userSessionRepository: UserSessionRepository
  ) {}

  /**
   * Retrieve the current user details
   *
   * @param id
   */
  async getCurrentUser(id: string): Promise<UserEntity> {
    return this.usersService.getUserDetails(id);
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

    const token = await this.jwtService.sign(payload);

    await this.userSessionRepository.userSessionDelete(user);
    await this.usersService.createUserSession(token, user);

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
