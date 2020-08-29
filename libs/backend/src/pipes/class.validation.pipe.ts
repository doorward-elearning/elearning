import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

@Injectable()
export default class ClassValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    return ClassValidationPipe.validate(metatype, value);
  }

  public static validate<T extends ClassType<unknown>>(metatype: T, value: any) {
    const object = plainToClass(metatype, value);
    const errors = validateSync(object);
    if (errors.length > 0) {
      throw new ValidationException(
        errors.reduce((acc, err) => {
          return {
            ...acc,
            [err.property]: Object.values(err.constraints)[0],
          };
        }, {})
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
