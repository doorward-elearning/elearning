import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import ApiBody from '@doorward/common/dtos/api.body';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

export default class YupValidationPipe implements PipeTransform {
  constructor(private Body: ClassType<ApiBody>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    YupValidationPipe.validate(this.Body, value);
    return value;
  }

  static validate(Body: ClassType<ApiBody>, value: any) {
    const body = new Body();
    try {
      body.validation().validateSync(value, {
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
