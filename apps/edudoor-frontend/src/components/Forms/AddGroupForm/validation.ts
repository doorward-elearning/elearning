import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string()
    .nullable()
    .required('The group name is required'),
  members: Yup.array()
    .of(Yup.string())
    .required('Please choose at least one member'),
});
