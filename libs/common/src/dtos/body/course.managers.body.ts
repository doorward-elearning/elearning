import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';

export class AddCourseManagerBody extends DApiBody {
  @ApiProperty()
  @Expose()
  managerId: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      managerId: Yup.string().required('The {{courseManager}} id is required.').nullable(),
    });
  }
}
