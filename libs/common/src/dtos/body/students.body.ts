import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { default as Yup, ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';

export class AddStudentsToCourseBody extends DApiBody {
  @ApiProperty()
  @Expose()
  students: Array<string>;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      students: Yup.array(Yup.string().nullable()).required('Please choose at least one {{student}}'),
    });
  }
}
