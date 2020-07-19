import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OpenviduUser, OpenviduUserSession } from '@doorward/common/types/openvidu';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(connectionId: string, sessionId: string): Promise<OpenviduUser | null> {
    return this.usersService.findOne(connectionId, sessionId);
  }

  async generateAccessToken(openviduUserSession: OpenviduUserSession): Promise<string> {
    return this.jwtService.sign(openviduUserSession);
  }
}
