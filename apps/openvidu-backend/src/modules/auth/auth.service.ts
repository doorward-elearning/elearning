import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OpenviduUser } from '@doorward/common/types/openvidu';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(connectionId: string, sessionId: string): Promise<OpenviduUser | null> {
    return this.usersService.findOne(connectionId, sessionId);
  }

  async generateAccessToken(openviduUserSession: UserEntity): Promise<string> {
    return this.jwtService.sign(openviduUserSession);
  }
}
