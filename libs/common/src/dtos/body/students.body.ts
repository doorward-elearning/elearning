import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import translate from '@doorward/common/lang/translate';

export class AddStudentsToCourseBody extends DApiBody {
  @Expose()
  students: Array<string>;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      students: Yup.array(Yup.string().nullable()).required(translate('chooseAtLeastOneStudent')),
    });
  }
}
