import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import EImage from '../../../ui/Image';
import './LoginForm.scss';
import TextField from '../../../ui/Input/TextField';
import PasswordField from '../../../ui/Input/PasswordField';
import Button from '../../../ui/Buttons/Button';
import Header from '../../../ui/Header';

const LoginForm: FunctionComponent<FormikProps<LoginFormState>> = props => {
  return (
    <form className="login-form" onSubmit={props.handleSubmit}>
      <div className="login-form__header">
        <EImage alt="" src="../assets/img/logo-2.png" circle size="xLarge" />
        <Header size={1}>Log in</Header>
      </div>
      <TextField name="username" placeholder="Username" icon="account_circle" formikProps={props} />
      <PasswordField name="password" placeholder="Password" icon="lock" formikProps={props} />
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
