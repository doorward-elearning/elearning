import React from 'react';
import { PageComponent } from '@edudoor/ui/src/types';
import Layout, { LayoutFeatures } from '../Layout';
import { NavbarFeatures } from '@edudoor/ui/src/components/NavBar';
import NewPasswordForm from '../../components/Forms/NewPasswordForm';
import useForm from '@edudoor/ui/src/hooks/useForm';
import './CreatePassword.scss';
import useRoutes from '../../hooks/useRoutes';
import PasswordPolicy from '../../components/UI/PasswordPolicy';
import Row from '@edudoor/ui/src/components/Row';
import EImage from '@edudoor/ui/src/components/Image';
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
