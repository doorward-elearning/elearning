import React, { FunctionComponent, useContext } from 'react';
import { FormikActions } from 'formik';
import { Link } from 'react-router-dom';
import EImage from '../../../ui/Image';
import './LoginForm.scss';
import TextField from '../../../ui/Input/TextField';
import PasswordField from '../../../ui/Input/PasswordField';
import Button from '../../../ui/Buttons/Button';
import Header from '../../../ui/Header';
import Form from '../../../ui/Form';
import loginForm from './validation';
import Card from '../../../ui/Card';
import IfElse from '../../../ui/IfElse';
import ProgressBar from '../../../ui/ProgressBar';
import useForm from '../../../../hooks/useForm';
import useAction from '../../../../hooks/useActions';
import { loginUserAction } from '../../../../reducers/login/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { ThemeContext } from '../../../ui/ApplicationTheme';

const LoginForm: FunctionComponent<LoginFormProps> = props => {
  const initialState = { username: '', password: '' };
  const form = useForm<LoginFormState>();
  const loginUser = useAction(loginUserAction);
  const login = useSelector((state: State) => state.login.loginUser);
  const { theme } = useContext(ThemeContext);

  const onSubmit = (values: LoginFormState, actions: FormikActions<LoginFormState>): void => {
    loginUser(values);
  };

  return (
    <Form
      initialValues={initialState}
      formClassName="login-form"
      onSubmit={onSubmit}
      validationSchema={loginForm}
      state={login}
      form={form}
    >
      {(formikProps): JSX.Element => (
        <Card>
          <Card.Header image>
            <IfElse condition={formikProps.isSubmitting}>
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
              <Button disabled={formikProps.isSubmitting}>Login</Button>
              <Link className="txt1" to="/forgotPassword">
                Forgot Password?
              </Link>
            </div>
          </Card.Body>
        </Card>
      )}
    </Form>
  );
};
export interface LoginFormProps {}
export declare type LoginFormState = {
  username: string;
  password: string;
};

export default LoginForm;
