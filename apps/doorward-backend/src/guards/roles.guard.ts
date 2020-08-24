import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '@doorward/common/types/roles';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!roles || !user) {
      return true;
    }

    return roles.some((role) => user.hasRole(role));
  }
}
