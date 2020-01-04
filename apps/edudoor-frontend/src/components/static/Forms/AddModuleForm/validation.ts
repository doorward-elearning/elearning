import * as Yup from 'yup';
import { AddModuleFormState } from './index';

export default Yup.object<AddModuleFormState>().shape({
  title: Yup.string().required('The module name is required.'),
});
