import React, { FunctionComponent, useEffect, useState } from 'react';
import '../Login/Login.scss';
import Layout from '../Layout';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import { Link, Redirect } from 'react-router-dom';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import IfElse from '@doorward/ui/components/IfElse';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import useOrganization from '../../hooks/useOrganization';
import useAuth from '../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../services/apis/doorward.api';

const Register: FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const [, registration] = useApiAction(DoorwardApi, (api) => api.auth.register);
  const { authenticate, authenticated } = useAuth();
  const [newAccount, setNewAccount] = useState(false);
  const organization = useOrganization();

  useEffect(() => {
    if (registration.data) {
      setNewAccount(true);
      authenticate(registration.data?.token);
      // clearLogin();
    }
  }, [registration.data]);

  return (
    <IfElse condition={authenticated}>
      <Redirect to={'/dashboard' + (newAccount ? '?newAccount=true' : '')} />
      <Layout {...props} noNavBar navFeatures={[NavbarFeatures.HAMBURGER]} withBackground>
        <div className="page page__login">
          <Header size={1}>{organization.name}</Header>
          <RegistrationForm />
          <div className="page__login--footer">
            <p>{translate('alreadyHaveAnAccount')}</p>
            <Link to="/login">{translate('login')}</Link>
          </div>
        </div>
      </Layout>
    </IfElse>
  );
};

export interface RegisterProps extends PageComponent {}

export default Register;
