import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import TextField from '../Input/TextField';
import PasswordField from '../Input/PasswordField';
import Checkbox from '../Input/Checkbox';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';

const LoginForm: FunctionComponent<FormikProps<LoginFormState>> = props => {
  return (
    <form className="login100-form validate-form" onSubmit={props.handleSubmit}>
      <span className="login100-form-logo">
        <img alt="" src="../assets/img/logo-2.png" />
      </span>
      <span className="login100-form-title p-b-34 p-t-27">Log in</span>
      <TextField
        name="username"
        placeholder="Username"
        emptyMessage="Enter username"
        icon="&#xf207;"
        formikProps={props}
      />
      <PasswordField
        name="password"
        placeholder="Password"
        emptyMessage="Enter password"
        icon="&#xf191;"
        formikProps={props}
      />
      <Checkbox name="remember-me" label="Remember me" />
      <div className="container-login100-form-btn">
        <Button className="login100-form-btn" loading={props.isSubmitting}>
          Login
        </Button>
      </div>
      <div className="text-center p-t-30">
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
