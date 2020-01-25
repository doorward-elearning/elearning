import * as Yup from 'yup';

export default Yup.object({
  fullName: Yup.string().required('The full name is required'),
  username: Yup.string()
    .matches(/^[a-z0-9]{4,20}$/, 'The username should consist of only lowercase characters and numbers')
    .required('The username is required'),
  email: Yup.string()
    .required('The email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .min(6, 'The password should be at least 6 characters long')
    .required('The password is required'),
});
