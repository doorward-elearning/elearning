import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@doorward/ui/components/Input/TextField';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import useForm from '@doorward/ui/hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';
import AuthForm from '../AuthForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { LoginBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const initialState = { username: '', password: '' };
  const form = useForm<LoginBody>();
  const login = useApiAction(DoorwardApi, (state) => state.auth.login);
  const routes = useRoutes();

  return (
    <AuthForm
      initialValues={initialState}
      buttonText={translate('login')}
      apiAction={login}
      validationSchema={LoginBody}
      form={form}
      title={translate('login')}
      renderFooter={() => <Link to={routes.forgotPassword.link}>Forgot Password?</Link>}
    >
      <React.Fragment>
        <TextField name="username" placeholder={translate('username')} icon="account_circle" />
        <PasswordField name="password" placeholder={translate('password')} icon="lock" />
      </React.Fragment>
    </AuthForm>
  );
};
export interface LoginFormProps {}

export default LoginForm;
