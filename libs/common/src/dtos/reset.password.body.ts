import ApiBody from '@doorward/common/dtos/api.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class ResetPasswordBody extends ApiBody {
  @ApiProperty()
  @Expose()
  resetToken: string;

  @ApiProperty()
  @Expose()
  password: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      resetToken: Yup.string().required('The reset token is required').nullable(),
      password: Yup.string().required('The new password is required').nullable(),
    });
  }
}
