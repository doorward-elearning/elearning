import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@doorward/ui/components/Input/TextField';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import loginForm from './validation';
import useForm from '@doorward/ui/hooks/useForm';
import { loginUserAction } from '../../../reducers/login/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useRoutes from '../../../hooks/useRoutes';
import AuthForm from '../AuthForm';

const LoginForm: FunctionComponent<LoginFormProps> = props => {
  const initialState = { username: '', password: '' };
  const form = useForm<LoginFormState>();
  const login = useSelector((state: State) => state.login.loginUser);
  const routes = useRoutes();

  return (
    <AuthForm
      initialValues={initialState}
      buttonText="Login"
      submitAction={loginUserAction}
      validationSchema={loginForm}
      state={login}
      form={form}
      title="Login"
      renderFooter={() => <Link to={routes.forgotPassword.link}>Forgot Password?</Link>}
    >
      <React.Fragment>
        <TextField name="username" placeholder="Username" icon="account_circle" />
        <PasswordField name="password" placeholder="Password" icon="lock" />
      </React.Fragment>
    </AuthForm>
  );
};
export interface LoginFormProps {}
export declare type LoginFormState = {
  username: string;
  password: string;
};

export default LoginForm;