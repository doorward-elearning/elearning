import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ObjectType } from 'typeorm';

export interface ModelExistsDecoratorProps<Entity> {
  key: string;
  model: ObjectType<Entity>;
  message?: string | (() => string);
}

function ModelExists<Entity>(model: ModelExistsDecoratorProps<Entity>) {
  if (model.message) {
    model.message = typeof model.message === 'string' ? model.message : model.message();
  }
  const result = SetMetadata('modelExists', model);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  result.metadataValue = model;

  return result;
}

export function ModelsExist(...models: Array<() => CustomDecorator<string>>) {
  const result = models.map((decorator) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return decorator().metadataValue;
  });

  return SetMetadata('modelsExist', result);
}

export default ModelExists;
