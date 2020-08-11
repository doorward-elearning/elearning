import * as Yup from 'yup';
import { AddConferenceFormState } from './index';

export default Yup.object<AddConferenceFormState>().shape({
  title: Yup.string().required('The conference name is required'),
  modules: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required('The module name is required'),
      })
    )
    .required('Please provide at least one module in the conference'),
});
