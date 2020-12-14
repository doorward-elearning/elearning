import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import translate from '@doorward/common/lang/translate';

export class AddMemberToGroupBody extends DApiBody {
  @Expose()
  members: Array<string>;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      members: Yup.array(Yup.string()).required(translate('chooseAtLeastOneMember')),
    });
  }
}

export class CreateGroupBody extends AddMemberToGroupBody {
  @Expose()
  name: string;

  @Expose()
  type: string;

  async validation?(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        name: Yup.string().required(translate('nameRequired')).nullable(),
        type: Yup.string().nullable(),
      }),
    );
  }
}
