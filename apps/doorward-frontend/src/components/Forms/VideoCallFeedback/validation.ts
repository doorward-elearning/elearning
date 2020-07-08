import * as Yup from 'yup';

export default Yup.object({
  rating: Yup.number()
    .nullable()
    .required('Please provide a rating.'),
});
