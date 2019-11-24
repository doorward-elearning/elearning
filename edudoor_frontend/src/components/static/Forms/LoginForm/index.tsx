import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import EImage from '../../../ui/Image';
import './LoginForm.scss';
import TextField from '../../../ui/Input/TextField';
import PasswordField from '../../../ui/Input/PasswordField';
import Button from '../../../ui/Buttons/Button';
import Header from '../../../ui/Header';
import loginForm from './validation';
import Card from '../../../ui/Card';
import IfElse from '../../../ui/IfElse';
import ProgressBar from '../../../ui/ProgressBar';
import useForm from '../../../../hooks/useForm';
import { loginUserAction } from '../../../../reducers/login/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { ThemeContext } from '../../../ui/ApplicationTheme';
import useRoutes from '../../../../hooks/useRoutes';
import BasicForm from '../BasicForm';

const LoginForm: FunctionComponent<LoginFormProps> = props => {
  const initialState = { username: '', password: '' };
  const form = useForm<LoginFormState>();
  const login = useSelector((state: State) => state.login.loginUser);
  const { theme } = useContext(ThemeContext);
  const routes = useRoutes();

  return (
    <BasicForm
      initialValues={initialState}
      formClassName="login-form"
      submitAction={loginUserAction}
      validationSchema={loginForm}
      state={login}
      features={[]}
      form={form}
    >
      <Card>
        <Card.Header image>
          <IfElse condition={form.formikProps?.isSubmitting}>
            <ProgressBar />
          </IfElse>
        </Card.Header>
        <Card.Body>
          <div className="login-form__header">
            <EImage alt="" src={theme.logo} circle size="xLarge" />
            <Header size={1}>Log in</Header>
          </div>
          <TextField name="username" placeholder="Username" icon="account_circle" />
          <PasswordField name="password" placeholder="Password" icon="lock" />
          <div className="login-form__footer">
            <Button loading={form.formikProps?.isSubmitting}>Login</Button>
            <Link to={routes.forgotPassword.link}>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
    </BasicForm>
  );
};
export interface LoginFormProps {}
export declare type LoginFormState = {
  username: string;
  password: string;
};

export default LoginForm;
