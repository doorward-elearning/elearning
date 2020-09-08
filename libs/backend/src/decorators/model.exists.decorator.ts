import { SetMetadata } from '@nestjs/common';
import { ObjectType } from 'typeorm';

export interface ModelExistsDecoratorProps<Entity> {
  key: string;
  model: ObjectType<Entity>;
  message?: string;
}

function ModelExists<Entity>(key: string, model: ObjectType<Entity>, message?: string | (() => string)) {
  if (message) {
    message = typeof message === 'string' ? message : message();
  }
  return SetMetadata('modelExists', { key, model, message });
}

export default ModelExists;
