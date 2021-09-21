import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExceptionCause } from '@doorward/backend/exceptions/exception.cause';
import JwtStrategy from '@doorward/backend/modules/base-auth/strategies/jwt.strategy';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly jwtStrategy: JwtStrategy) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    // This is to ensure that when a user is logged in, their token is
    // processed regardless of whether the route is public or not.
    let canActivate = false;
    try {
      canActivate = await (super.canActivate(context) as Promise<boolean>);
    } catch (error) {
      if (!isPublic) {
        console.error(error);
        throw new UnauthorizedException({
          message: 'Unauthorized',
          cause: ExceptionCause.invalid_jwt_token,
        });
      }
    }

    return canActivate || isPublic;
  }
}
