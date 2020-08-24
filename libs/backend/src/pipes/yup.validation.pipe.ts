import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import ApiBody from '@doorward/common/dtos/api.body';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

@Injectable()
export default class YupValidationPipe implements PipeTransform {
  constructor(private Body: ClassType<ApiBody>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    await YupValidationPipe.validate(this.Body, value);
    return value;
  }

  static async validate(Body: ClassType<ApiBody>, value: any) {
    const body = new Body();
    try {
      await (await body.validation()).validate(value, {
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
