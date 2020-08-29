import * as Yup from 'yup';
import ApiBody from '@doorward/common/dtos/api.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class LoginBody extends ApiBody {
  @ApiProperty({ example: 'administrator' })
  @Expose()
  username: string;

  @Expose()
  @ApiProperty({ example: 'password' })
  password: string;

  async validation(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      password: Yup.string().required('Password is required').nullable(),
    });
  }
}
