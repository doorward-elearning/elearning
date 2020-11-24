import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { Expose } from 'class-transformer';
import translate from '@doorward/common/lang/translate';

export class CreateSchoolBody extends DApiBody {
  @Expose()
  name: string;

  @Expose()
  email: string;

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
  @Expose()
  name: string;
  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required(translate.nameRequired()),
    });
  }
}
