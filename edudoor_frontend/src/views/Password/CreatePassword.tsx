import React from 'react';
import { PageComponent } from '../../types';
import Layout from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import Card from '../../components/ui/Card';
import Header from '../../components/ui/Header';
import NewPasswordForm from '../../components/static/Forms/NewPasswordForm';
import useForm from '../../hooks/useForm';
import './CreatePassword.scss';
import useRoutes from '../../hooks/useRoutes';

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
    >
      <div className="create-password__page">
        <Card>
          <Card.Header>
            <Header size={3}>Create a new password</Header>
          </Card.Header>
          <Card.Body>
            <NewPasswordForm form={form} onSuccess={onSuccess} />
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export interface CreatePasswordProps extends PageComponent {}

export default CreatePassword;
