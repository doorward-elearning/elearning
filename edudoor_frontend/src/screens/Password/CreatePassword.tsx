import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import NewPasswordForm from '../../components/static/Forms/NewPasswordForm';
import useForm from '../../hooks/useForm';
import './CreatePassword.scss';
import useRoutes from '../../hooks/useRoutes';
import PasswordPolicy from '../../components/static/UI/PasswordPolicy';
import Row from '../../components/ui/Row';
import EImage from '../../components/ui/Image';
import createPassword from '../../assets/illustrations/create_new_password.svg';

const CreatePassword: React.FunctionComponent<CreatePasswordProps> = props => {
  const form = useForm();
  const routes = useRoutes();

  const onSuccess = (): void => {
    routes.navigate(routes.login);
  };

  return (
    <Layout
      {...props}
      header="Create a new password"
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]}
      features={[LayoutFeatures.HEADER]}
    >
      <Row style={{ alignItems: 'start', gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <PasswordPolicy />
          <NewPasswordForm form={form} onSuccess={onSuccess} onCancel={onSuccess} />
        </div>
        <div>
          <EImage src={createPassword} size="responsive" />
        </div>
      </Row>
    </Layout>
  );
};

export interface CreatePasswordProps extends PageComponent {}

export default CreatePassword;
