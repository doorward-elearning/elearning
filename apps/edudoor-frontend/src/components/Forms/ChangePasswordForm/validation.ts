import * as Yup from 'yup';
import { ChangePasswordFormState } from './index';

export default (currentPassword = true) => {
  const validation = {
    password: Yup.string().required('Enter your current password'),
    newPassword: Yup.string()
      .required('Enter a new password')
      .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match'),
    confirmPassword: Yup.string()
      .required('Re-enter the new password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  };

  if (!currentPassword) {
    delete validation.password;
  }
  return Yup.object<ChangePasswordFormState>(validation);
};
