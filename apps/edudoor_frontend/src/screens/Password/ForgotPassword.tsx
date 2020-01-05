import React from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import forgotPassword from '../../assets/illustrations/forgot_password.svg';
import EImage from '@edudoor/ui/components/Image';
import Row from '@edudoor/ui/components/Row';

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
