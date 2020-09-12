import DApiBody from '@doorward/common/dtos/d.api.body';
import Yup, { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class UpdateAccountBody extends DApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      email: Yup.string().nullable().email('Please enter a valid email'),
    });
  }
}
