import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class PrivilegesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const privileges = this.reflector.get<string[]>('privileges', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!privileges || !user) {
      return true;
    }

    return !privileges.find((privilege) => !user.hasPrivilege(privilege));
  }
}
