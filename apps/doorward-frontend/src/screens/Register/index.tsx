import React, { FunctionComponent } from 'react';
import '../Login/Login.scss';
import Layout from '../Layout';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import { Link, Redirect } from 'react-router-dom';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import useOrganization from '../../hooks/useOrganization';
import useAuth from '../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';

const Register: FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const { authenticated } = useAuth();
  const organization = useOrganization();

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout {...props} noNavBar navFeatures={[NavbarFeatures.HAMBURGER]} withBackground hideBackButton>
      <div className="page page__login">
        <Header size={1}>{organization.name}</Header>
        <RegistrationForm />
        <div className="page__login--footer">
          <p>{translate('alreadyHaveAnAccount')}</p>
          <Link to="/login">{translate('login')}</Link>
        </div>
      </div>
    </Layout>
  );
};

export interface RegisterProps extends PageComponent {}

export default Register;
