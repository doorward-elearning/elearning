import * as Yup from 'yup';

export default Yup.object({
  title: Yup.string().required('The title is required'),
  content: Yup.string().required('The page content is required.'),
});
