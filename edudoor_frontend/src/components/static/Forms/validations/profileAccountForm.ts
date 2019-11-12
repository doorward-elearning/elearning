import * as Yup from 'yup';
import { ProfileAccountFormState } from '../ProfileAccountForm';

export default Yup.object<ProfileAccountFormState>({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string()
    .email('Enter a valid email')
    .required('The email is required'),
  username: Yup.string().required('The username is required and should be unique'),
});
