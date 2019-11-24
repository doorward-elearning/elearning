import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import NewPasswordForm from '../../components/static/Forms/NewPasswordForm';
import useForm from '../../hooks/useForm';
import './CreatePassword.scss';
import useRoutes from '../../hooks/useRoutes';
import PasswordPolicy from '../../components/static/UI/PasswordPolicy';

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
      <PasswordPolicy />
      <NewPasswordForm form={form} onSuccess={onSuccess} onCancel={onSuccess} />
    </Layout>
  );
};

export interface CreatePasswordProps extends PageComponent {}

export default CreatePassword;
