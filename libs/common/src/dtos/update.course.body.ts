import DApiBody from '@doorward/common/dtos/d.api.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';

export default class UpdateCourseBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('The {{course}} title is required').nullable(),
    });
  }
}
