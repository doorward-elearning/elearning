import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OpenviduUser } from '@doorward/common/types/openvidu';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'sessionId',
      passwordField: 'connectionId',
    });
  }

  async validate(sessionId: string, connectionId: string): Promise<OpenviduUser> {
    const user = await this.authService.validateUser(connectionId, sessionId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
