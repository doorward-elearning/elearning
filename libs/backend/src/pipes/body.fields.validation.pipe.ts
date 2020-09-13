import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import DApiBody from '@doorward/common/dtos/body/d.api.body';

@Injectable()
export default class BodyFieldsValidationPipe implements PipeTransform<any> {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !(new metatype() instanceof DApiBody)) {
      return value;
    }
    return plainToClass(metatype, value, {
      excludeExtraneousValues: true,
    });
  }
}
