import ApiBody from '@doorward/common/dtos/api.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class ForgotPasswordBody extends ApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
    });
  }
}
