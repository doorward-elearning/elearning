import * as Yup from 'yup';
import { AddForumFormState } from './index';

export default Yup.object<AddForumFormState>().shape({
  title: Yup.string().required('The forum name is required'),
  modules: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required('The module name is required'),
      })
    )
    .required('Please provide at least one module in the forum'),
});
