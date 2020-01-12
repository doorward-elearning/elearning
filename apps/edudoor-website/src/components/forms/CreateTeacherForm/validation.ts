import * as Yup from 'yup';

export default Yup.object({
  email: Yup.string().email('Please enter a valid email'),
  password: Yup.string()
    .nullable()
    .required('The password is required'),
  fullName: Yup.string()
    .nullable()
    .required('Please enter your full name'),
});
