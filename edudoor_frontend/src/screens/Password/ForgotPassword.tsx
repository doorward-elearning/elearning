import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import ForgotPasswordForm from '../../components/static/Forms/ForgotPasswordForm';

const ForgotPassword: React.FunctionComponent<ResetPasswordProps> = props => {
  return (
    <Layout
      {...props}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]}
      features={[LayoutFeatures.HEADER]}
      header="Forgot password"
    >
      <p>Kindly provide the email address you used during the registration. You will receive a password reset link</p>
      <ForgotPasswordForm />
    </Layout>
  );
};

export interface ResetPasswordProps extends PageComponent {}

export default ForgotPassword;
