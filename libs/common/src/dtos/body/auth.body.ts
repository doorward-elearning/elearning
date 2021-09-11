import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import translate from '@doorward/common/lang/translate';
import { arrayOf } from 'prop-types';

export class ForgotPasswordBody extends DApiBody {
  @Expose()
  username: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      username: Yup.string().required(translate('usernameIsRequired')).nullable(),
    });
  }
}

export class LoginBody extends DApiBody {
  @Expose()
  username: string;

  @Expose()
  password: string;

  async validation?(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required(translate('usernameIsRequired')).nullable(),
      password: Yup.string().required(translate('passwordIsRequired')).nullable(),
    });
  }
}

export class RegisterBody extends DApiBody {
  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  async validation?(): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string().required(translate('usernameIsRequired')).nullable(),
      password: Yup.string().required(translate('passwordIsRequired')).nullable(),
      email: Yup.string().required(translate('emailIsRequired')).email(translate('enterValidEmail')).nullable(),
      firstName: Yup.string().notRequired(),
      lastName: Yup.string().notRequired(),
    });
  }
}

export class ResetPasswordBody extends DApiBody {
  @Expose()
  resetToken: string;

  @Expose()
  password: string;

  @Expose()
  confirmPassword: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      resetToken: Yup.string().required(translate('resetTokenRequired')).nullable(),
      password: Yup.string().required(translate('newPasswordRequired')).nullable(),
      confirmPassword: Yup.string()
      .required(translate('reEnterPassword')) 
      .oneOf(  [Yup.ref( 'password'),null], translate( 'passwordsMustMatch')),

    });
  }
}

export class UpdatePasswordBody extends DApiBody {
  @Expose()
  password: string;

  @Expose()
  newPassword: string;

  @Expose()
  confirmPassword: string;

  async validation?(currentPassword?: boolean): Promise<ObjectSchema> {
    const validation = {
      password: Yup.string().required(translate('enterCurrentPassword')),
      newPassword: Yup.string()
        .required(translate('enterNewPassword'))
        .oneOf([Yup.ref('confirmPassword'), null], translate('passwordsMustMatch'))
        .notOneOf([Yup.ref('password'), null], translate('newPasswordCannotBeSameAsOldPassword')),
      confirmPassword: Yup.string()
        .required('Re-enter the new password')
        .oneOf([Yup.ref('newPassword'), null], translate('passwordsMustMatch')),
    };

    if (!currentPassword) {
      delete validation.password;
    }
    return Yup.object(validation);
  }
}

export class ForceChangePasswordBody extends DApiBody {
  @Expose()
  password: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      password: Yup.string().required(translate('passwordIsRequired')).nullable(),
    });
  }
}
