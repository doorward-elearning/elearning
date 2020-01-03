import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import ForgotPasswordForm from '../../components/static/Forms/ForgotPasswordForm';
import forgotPassword from '../../assets/illustrations/forgot_password.svg';
import EImage from '../../components/ui/Image';
import Row from '../../components/ui/Row';

const ForgotPassword: React.FunctionComponent<ResetPasswordProps> = props => {
  return (
    <Layout
      {...props}
      withBackground
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]}
      features={[LayoutFeatures.HEADER]}
      header="Forgot password"
    >
      <Row style={{ alignItems: 'start' }}>
        <div>
          <p>
            Kindly provide the email address you used during the registration. You will receive a password reset link
          </p>
          <ForgotPasswordForm />
        </div>
        <div>
          <EImage src={forgotPassword} size="responsive" />
        </div>
      </Row>
    </Layout>
  );
};

export interface ResetPasswordProps extends PageComponent {}

export default ForgotPassword;
