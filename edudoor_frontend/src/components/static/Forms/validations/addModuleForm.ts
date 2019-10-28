import * as Yup from 'yup';
import { AddModuleFormState } from '../AddModuleForm';

export default Yup.object<AddModuleFormState>().shape({
  name: Yup.string().required('The module name is required.'),
});
