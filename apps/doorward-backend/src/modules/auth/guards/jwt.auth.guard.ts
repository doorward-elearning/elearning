import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    // This is to ensure that when a user is logged in, their token is
    // processed regardless of whether the route is public or not.
    const canActivate = await (super.canActivate(context) as Promise<boolean>);

    return canActivate || isPublic;
  }
}
