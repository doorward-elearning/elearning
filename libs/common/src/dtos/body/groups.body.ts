import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';

export class AddMemberToGroupBody extends DApiBody {
  @ApiProperty()
  @Expose()
  members: Array<string>;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      members: Yup.array(Yup.string()).required('Please choose at least one member.'),
    });
  }
}

export class CreateGroupBody extends AddMemberToGroupBody {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  type: string;

  async validation(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        name: Yup.string().required('The group name is required').nullable(),
        type: Yup.string().nullable(),
      })
    );
  }
}
