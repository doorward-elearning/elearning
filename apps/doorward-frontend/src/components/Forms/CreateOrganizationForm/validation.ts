import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string()
    .nullable()
    .required('The organization name is required'),
  icon: Yup.string()
    .nullable()
    .matches(/((https:\/\/)|(http:\/\/)).*/, 'Please enter a valid image URL')
    .required('The organization icon is required'),
});
