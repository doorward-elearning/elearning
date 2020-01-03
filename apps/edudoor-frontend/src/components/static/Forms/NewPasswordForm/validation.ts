import * as Yup from 'yup';
import { NewPasswordFormState } from './index';

export default Yup.object<NewPasswordFormState>({
  resetTokenBuffer: Yup.string(),
  resetToken: Yup.string(),
  password: Yup.string().required('Please enter the new password'),
  confirmPassword: Yup.string()
    .required('Please re-enter the new password')
    .oneOf([Yup.ref('password'), null], 'Passwords should match.'),
});
