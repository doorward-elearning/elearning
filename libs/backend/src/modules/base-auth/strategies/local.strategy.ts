import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { BaseAuthService } from '@doorward/backend/modules/base-auth/base-auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: BaseAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserLogin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
