import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import ApiBody from '@doorward/common/dtos/api.body';

@Injectable()
export default class BodyFieldsValidationPipe implements PipeTransform<any> {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !(new metatype() instanceof ApiBody)) {
      return value;
    }
    return plainToClass(metatype, value, {
      excludeExtraneousValues: true,
    });
  }
}
