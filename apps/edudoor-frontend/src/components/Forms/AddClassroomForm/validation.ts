import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string()
    .nullable()
    .required('The name of the classroom is required'),
});
