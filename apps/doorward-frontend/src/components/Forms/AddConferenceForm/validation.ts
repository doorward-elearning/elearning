import * as Yup from 'yup';
import { AddConferenceFormState } from './index';

export default Yup.object<AddConferenceFormState>().shape({
  title: Yup.string().required('The conference name is required'),
});
