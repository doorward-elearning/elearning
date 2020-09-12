import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';
import DApiBody from '@doorward/common/dtos/d.api.body';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

@Injectable()
export default class YupValidationPipe implements PipeTransform {
  constructor() {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !(new metatype() instanceof DApiBody)) {
      return value;
    }
    await YupValidationPipe.validate(metatype, value);
    return value;
  }

  static async validate(Body: ClassType<DApiBody>, value: any) {
    const body = new Body();
    try {
      await (await body.validation()).validate(value || {}, {
        abortEarly: false,
      });
    } catch (err) {
      if (err.inner) {
        const errors = err.inner.reduce((acc, { path, errors }) => {
          return {
            ...acc,
            [path]: errors[0],
          };
        }, {});
        throw new ValidationException(errors);
      } else {
        throw err;
      }
    }
  }
}
