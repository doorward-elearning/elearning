import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { UserStatus } from '@doorward/common/types/users';
import { Gender } from '@doorward/common/types/genders';
import { Roles } from '@doorward/common/types/roles';
import DApiBody from '@doorward/common/dtos/body/base.body';
import translate from '@doorward/common/lang/translate';

export class UpdateAccountBody extends DApiBody {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phoneNumber: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      email: Yup.string().email(translate.enterValidEmail()).nullable(),
      phoneNumber: Yup.string()
        .nullable()
        .when('email', {
          is: (value) => !value,
          then: Yup.string().required(translate.enterEmailOrPhoneNumber()),
        }),
    });
  }
}

export class UpdateUserBody extends DApiBody {
  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  zipCode?: string;

  @Expose()
  country?: string;

  @Expose()
  city?: string;

  @Expose()
  status?: UserStatus;

  @Expose()
  gender?: Gender;

  @Expose()
  phoneNumber?: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required(translate.usernameIsRequired()).nullable(),
      firstName: Yup.string().required(translate.firstNameRequired()).nullable(),
      lastName: Yup.string().required(translate.lastNameRequired()).nullable(),
      email: Yup.string().email(translate.emailIsRequired()).nullable(),
      phoneNumber: Yup.string()
        .nullable()
        .when('email', {
          is: (value) => !value,
          then: Yup.string().required(translate.enterEmailOrPhoneNumber()),
        }),
    });
  }
}

export class CreateUserBody extends UpdateUserBody {
  @Expose()
  password?: string;

  @Expose()
  role?: Roles;

  async validation?(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        password: Yup.string().notRequired().nullable(),
      })
    );
  }
}
