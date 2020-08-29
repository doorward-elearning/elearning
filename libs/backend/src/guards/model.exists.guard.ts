import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModelExistsDecoratorProps } from '@doorward/backend/decorators/model.exists.decorator';
import { getConnectionManager } from 'typeorm';

@Injectable()
export default class ModelExistsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { key, model, message } = this.reflector.get<ModelExistsDecoratorProps<any>>(
      'modelExists',
      context.getHandler()
    );

    const http = context.switchToHttp();
    if (http) {
      const body = http.getRequest().body;
      const params = http.getRequest().params;
      const query = http.getRequest().query;

      const id = body[key] || params[key] || query[key];

      if (id) {
        if (await getConnectionManager().get().getRepository(model).findOne(id)) {
          return true;
        } else {
          throw new NotFoundException(message || 'Resource not found.');
        }
      } else {
        return true;
      }
    }
    return true;
  }
}
