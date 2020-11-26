import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { UserStatus } from '@doorward/common/types/users';
import { Gender } from '@doorward/common/types/genders';
import { Roles } from '@doorward/common/types/roles';
import DApiBody from '@doorward/common/dtos/body/base.body';
import translate from '@doorward/common/lang/translate';

export class UpdateAccountBody extends DApiBody {
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

  @ApiProperty()
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
  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  zipCode?: string;

  @ApiProperty()
  @Expose()
  country?: string;

  @ApiProperty()
  @Expose()
  city?: string;

  @ApiProperty()
  @Expose()
  status?: UserStatus;

  @ApiProperty()
  @Expose()
  gender?: Gender;

  @ApiProperty()
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
  @ApiProperty()
  @Expose()
  password?: string;

  @ApiProperty()
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
