import DApiBody from '@doorward/common/dtos/d.api.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import * as Yup from 'yup';
import { Expose } from 'class-transformer';

export default class UpdatePasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  newPassword: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      password: Yup.string().required('The existing password is required').nullable(),
      newPassword: Yup.string()
        .required('The new password is required')
        .nullable()
        .oneOf([Yup.ref('password'), null], 'Passwords should match.'),
    });
  }
}
