import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('The school name is required'),
  phoneNumber: Yup.string().required('The school phone number is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .nullable()
    .required('The email is required'),
});
