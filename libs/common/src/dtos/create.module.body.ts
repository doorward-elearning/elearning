import ApiBody from '@doorward/common/dtos/api.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';

export default class CreateModuleBody extends ApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('Please provide the module title.').nullable(),
    });
  }
}
