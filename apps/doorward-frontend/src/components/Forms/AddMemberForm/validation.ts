import * as Yup from 'yup';
import { AddMemberFormState } from './index';

export default Yup.object<AddMemberFormState>({
  email: Yup.string()
    .required('The member email is required')
    .email('Please enter a valid email'),
  lastName: Yup.string().required('Enter the last name'),
  firstName: Yup.string().required('Enter the first name'),
  username: Yup.string().required('Enter a unique username.'),
  city: Yup.string(),
  country: Yup.string(),
});
