import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExceptionCause } from '@doorward/backend/exceptions/exception.cause';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';
import { UserSessionRepository } from '../repositories/user.session.repository';
import Tools from '@doorward/common/utils/Tools';
import UserEntity from '@doorward/common/entities/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private userSessionRepository: UserSessionRepository,
    private readonly logger: DoorwardLogger
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    const token = context.switchToHttp().getRequest().headers.authorization?.split(' ')?.[1];
    const session = await this.userSessionRepository.getActiveUserSession(token);
    let canActivate = false;
    // This is to ensure that when a user is logged in, their token is
    // processed regardless of whether the route is public or not.
    try {
      canActivate = await (super.canActivate(context) as Promise<boolean>);
    } catch (error) {
      if (!isPublic) {
        this.logger.error(error, 'Invalid jwt token');
        throw new UnauthorizedException({
          message: 'Unauthorized',
          cause: ExceptionCause.invalid_jwt_token,
        });
      }
    }

    return canActivate || isPublic;
  }
}
