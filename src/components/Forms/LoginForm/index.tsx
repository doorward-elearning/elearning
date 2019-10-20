import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import Checkbox from '../../Input/Checkbox';
import Button from '../../Buttons/Button';
import Image from '../../Image';
import TextField from '../../Input/TextField';
import PasswordField from '../../Input/PasswordField';
import Header from '../../Header';
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
