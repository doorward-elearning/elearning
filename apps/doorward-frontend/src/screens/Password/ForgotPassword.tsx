import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import forgotPassword from '../../assets/illustrations/forgot_password.svg';
import EImage from '@doorward/ui/components/Image';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Row from '@doorward/ui/components/Row';
import { PageComponent } from '@doorward/ui/types';

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
