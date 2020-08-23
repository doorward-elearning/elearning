import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import ApiBody from '@doorward/common/dtos/api.body';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { Connection, getConnectionManager } from 'typeorm';

@Injectable()
export default class YupValidationPipe implements PipeTransform {
  constructor(private Body: ClassType<ApiBody>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    let connection;
    try {
      const connectionManager = getConnectionManager();
      connection = connectionManager.get();
    } catch (error) {
      console.error(error);
    }
    await YupValidationPipe.validate(this.Body, value, connection);
    return value;
  }

  static async validate(Body: ClassType<ApiBody>, value: any, connection?: Connection) {
    const body = new Body();
    try {
      await (await body.validation(connection)).validate(value, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = err.inner.reduce((acc, { path, errors }) => {
        return {
          ...acc,
          [path]: errors[0],
        };
      }, {});
      throw new ValidationException(errors);
    }
  }
}
