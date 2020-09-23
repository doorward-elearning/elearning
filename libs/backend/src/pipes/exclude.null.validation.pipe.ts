import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import DApiBody from '@doorward/common/dtos/body/base.body';

@Injectable()
export default class ExcludeNullValidationPipe implements PipeTransform<any> {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !(new metatype() instanceof DApiBody) || !value) {
      return value;
    }
    return pickBy(value, identity);
  }
}
