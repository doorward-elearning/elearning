import * as Yup from 'yup';
import { AddStudentFormState } from './index';

export default Yup.object<AddStudentFormState>({
  email: Yup.string()
    .required('The student email is required')
    .email('Please enter a valid email'),
  lastName: Yup.string().required('Enter the last name'),
  firstName: Yup.string().required('Enter the first name'),
  username: Yup.string().required('Enter a unique username.'),
  city: Yup.string(),
  country: Yup.string(),
});
