import { CanActivate, ExecutionContext, PayloadTooLargeException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export class SizeLimitGuard implements CanActivate {
  constructor(private reflector: Reflector, private sizeLimit: number) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const limit = this.reflector.get('payloadSizeLimit', context.getHandler()) || this.sizeLimit;

    if (limit > request.socket.bytesRead) {
      return true;
    }

    throw new PayloadTooLargeException('Request Entity Too Large Error');
  }
}
