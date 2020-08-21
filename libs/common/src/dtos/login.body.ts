import * as Yup from 'yup';
import ApiBody from '@doorward/common/dtos/api.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginBody implements ApiBody {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  validation(): ObjectSchema<object> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      password: Yup.string().required('Password is required').nullable(),
    });
  }
}
