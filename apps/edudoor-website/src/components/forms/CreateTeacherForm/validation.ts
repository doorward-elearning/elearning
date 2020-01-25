import * as Yup from 'yup';

export default Yup.object({
  firstName: Yup.string().required('The first name is required'),
  lastName: Yup.string().required('The last name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .nullable()
    .required('The email is required'),
  password: Yup.string()
    .nullable()
    .required('The password is required'),
  username: Yup.string()
    .nullable()
    .required('Please choose your username'),
});
