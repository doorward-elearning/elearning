import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';

export class CreateGroupBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  members: Array<string>;

  @ApiProperty()
  @Expose()
  type: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required('The group name is required').nullable(),
      members: Yup.array(Yup.string()).required('Please choose at least one member.'),
      type: Yup.string().nullable(),
    });
  }
}
