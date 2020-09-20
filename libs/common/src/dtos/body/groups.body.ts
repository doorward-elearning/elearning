import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { default as Yup, ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/index';

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
