import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';

@Injectable()
export default class PrivilegesGuard implements CanActivate {
  constructor(private reflector: Reflector, private logger: DoorwardLogger) {
    logger.setContext('PrivilegesGuard');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const privileges = this.reflector.get<string[]>('privileges', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!privileges || !user) {
      return true;
    }

    const hasPrivileges = await user.hasPrivileges(...privileges);

    if (!hasPrivileges) {
      this.logger.info(`Access to ${request.url} for user [${user.id}] blocked. Requires privileges [${privileges}]`);
      throw new ForbiddenException("You don't have sufficient privileges to access: " + request.url);
    }
    return true;
  }
}
