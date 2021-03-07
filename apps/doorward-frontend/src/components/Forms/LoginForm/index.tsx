import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@doorward/ui/components/Input/TextField';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import useForm from '@doorward/ui/hooks/useForm';
import AuthForm from '../AuthForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { LoginBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import useAuth from '../../../hooks/useAuth';
import ROUTES from '@doorward/common/frontend/routes/main';

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const initialState = { username: '', password: '' };
  const form = useForm<LoginBody>();
  const login = useApiAction(DoorwardApi, (state) => state.auth.login, {
    clearData: true,
    clearErrors: true,
  });
  const auth = useAuth();
  const [getCurrentUser] = useApiAction(DoorwardApi, (api) => api.auth.getCurrentUser);

  return (
    <AuthForm
      initialValues={initialState}
      buttonText={translate('login')}
      apiAction={login}
      onSuccess={(result) => {
        getCurrentUser();
        auth.authenticate(result.token);
        window.location.href = '/dashboard';
      }}
      validationSchema={LoginBody}
      form={form}
      title={translate('login')}
      renderFooter={() => <Link to={ROUTES.auth.password.forgot}>{translate('forgotPassword') + '?'}</Link>}
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
