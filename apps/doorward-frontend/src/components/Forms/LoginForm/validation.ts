import * as Yup from 'yup';
import { LoginFormState } from './index';

export default Yup.object<LoginFormState>().shape({
  username: Yup.string().required('The username is required.'),
  password: Yup.string().required('The password is required.'),
});
