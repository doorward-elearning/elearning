import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModelExistsDecoratorProps } from '@doorward/backend/decorators/model.exists.decorator';
import { RequestScopedInjectable } from '@doorward/backend/decorators/request.scoped.service.decorator';
import { ORGANIZATION_CONNECTION } from '@doorward/backend/constants';
import { Connection } from 'typeorm';

@RequestScopedInjectable()
export default class ModelExistsGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject(ORGANIZATION_CONNECTION) private connection: Connection) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const models: Array<ModelExistsDecoratorProps<any>> = [];
    const model = this.reflector.get<ModelExistsDecoratorProps<any>>('modelExists', context.getHandler());

    if (model) {
      models.push(model);
    }
    const modelsBuilder = this.reflector.get<Array<ModelExistsDecoratorProps<any>>>(
      'modelsExist',
      context.getHandler()
    );

    if (modelsBuilder) {
      models.push(...modelsBuilder);
    }

    if (!models.length) {
      return true;
    }

    await Promise.all(
      models.map(async (modelExistsDecoratorProps) => {
        const { key, model, message } = modelExistsDecoratorProps;

        const http = context.switchToHttp();
        if (http) {
          const body = http.getRequest().body;
          const params = http.getRequest().params;
          const query = http.getRequest().query;

          const id = body[key] || params[key] || query[key];

          if (id) {
            if (await this.connection.getRepository(model).findOne(id)) {
              return true;
            } else {
              throw new NotFoundException(message || 'Resource not found.');
            }
          } else {
            return true;
          }
        }
        return true;
      })
    );
    return true;
  }
}
