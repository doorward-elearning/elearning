import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import Checkbox from '../../../common/Input/Checkbox';
import Button from '../../../common/Buttons/Button';
import Image from '../../../common/Image';
import TextField from '../../../common/Input/TextField';
import PasswordField from '../../../common/Input/PasswordField';
import Header from '../../../common/Header';
import './LoginForm.scss';

const LoginForm: FunctionComponent<FormikProps<LoginFormState>> = props => {
  return (
    <form className="login-form" onSubmit={props.handleSubmit}>
      <div className="login-form__header">
        <Image alt="" src="../assets/img/logo-2.png" circle size="xLarge" />
        <Header size={1}>Log in</Header>
      </div>
      <TextField name="username" placeholder="Username" icon="account_circle" formikProps={props} />
      <PasswordField name="password" placeholder="Password" icon="lock" formikProps={props} />
      <Checkbox name="remember-me" label="Remember me" />
      <div className="login-form__footer">
        <Button disabled={props.isSubmitting}>Login</Button>
        <Link className="txt1" to="/forgotPassword">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
};

export declare type LoginFormState = {
  username: string;
  password: string;
};

export default LoginForm;
