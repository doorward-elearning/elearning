import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { UserStatus } from '@doorward/common/types/users';
import { Gender } from '@doorward/common/types/genders';
import { Roles } from '@doorward/common/types/roles';
import DApiBody from '@doorward/common/dtos/body/base.body';

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

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      email: Yup.string().nullable().email('Please enter a valid email'),
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

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      firstName: Yup.string().required('First name is required').nullable(),
      lastName: Yup.string().required('Last name is required').nullable(),
      email: Yup.string().email('Please enter a valid email').required('The email is required').nullable(),
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

  async validation(): Promise<ObjectSchema> {
    return (await super.validation()).concat(
      Yup.object({
        password: Yup.string().notRequired().nullable(),
      })
    );
  }
}
