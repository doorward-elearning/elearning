import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';

export class ForgotPasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
    });
  }
}

export class LoginBody extends DApiBody {
  @ApiProperty({ example: 'administrator' })
  @Expose()
  username: string;

  @Expose()
  @ApiProperty({ example: 'password' })
  password: string;

  async validation(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      password: Yup.string().required('Password is required').nullable(),
    });
  }
}

export class RegisterBody extends DApiBody {
  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  email: string;

  async validation(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required('Username is required').nullable(),
      password: Yup.string().required('Password is required').nullable(),
      email: Yup.string().required('Email is required').email('Please enter a valid email').nullable(),
    });
  }
}

export class ResetPasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  resetToken: string;

  @ApiProperty()
  @Expose()
  password: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      resetToken: Yup.string().required('The reset token is required').nullable(),
      password: Yup.string().required('The new password is required').nullable(),
    });
  }
}

export class UpdatePasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  newPassword: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      password: Yup.string().required('The existing password is required').nullable(),
      newPassword: Yup.string()
        .required('The new password is required')
        .nullable()
        .oneOf([Yup.ref('password'), null], 'Passwords should match.'),
    });
  }
}

export class ForceChangePasswordBody extends DApiBody {
  @ApiProperty()
  @Expose()
  password: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      password: Yup.string().required('The password is required').nullable(),
    });
  }
}
