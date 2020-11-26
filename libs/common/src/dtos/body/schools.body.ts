import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import translate from '@doorward/common/lang/translate';

export class CreateSchoolBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required(translate.nameRequired()).nullable(),
      email: Yup.string().required(translate.emailIsRequired()).nullable(),
      phoneNumber: Yup.string().required(translate.phoneNumberRequired()).nullable(),
    });
  }
}

export class CreateClassroomBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;
  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required(translate.nameRequired()),
    });
  }
}
