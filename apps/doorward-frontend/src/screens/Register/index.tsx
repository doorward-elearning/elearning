import React, { FunctionComponent, useEffect, useState } from 'react';
import '../Login/Login.scss';
import Layout from '../Layout';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import { Link, Redirect } from 'react-router-dom';
import useRoutes from '../../hooks/useRoutes';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import IfElse from '@doorward/ui/components/IfElse';
import useAction from '@doorward/ui/hooks/useActions';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import useOrganization from '../../hooks/useOrganization';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import useAuth from '../../hooks/useAuth';
import { clearLoginAction } from '../../reducers/auth/actions';
import translate from '@doorward/common/lang/translate';

const Register: FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const registration = useDoorwardApi((state) => state.auth.register);
  const { authenticate, authenticated } = useAuth();
  const [newAccount, setNewAccount] = useState(false);
  const organization = useOrganization();
  const routes = useRoutes();
  const clearLogin = useAction(clearLoginAction);

  useEffect(() => {
    if (registration.data) {
      setNewAccount(true);
      authenticate(registration.data.token);
      clearLogin();
    }
  }, [registration.data]);

  return (
    <IfElse condition={authenticated}>
      <Redirect to={routes.dashboard.link + (newAccount ? '?newAccount=true' : '')} />
      <Layout {...props} noNavBar navFeatures={[NavbarFeatures.HAMBURGER]} withBackground>
        <div className="page page__login">
          <Header size={1}>{organization.name}</Header>
          <RegistrationForm />
          <div className="page__login--footer">
            <p>{translate('alreadyHaveAnAccount')}</p>
            <Link to={routes.login.link}>{translate('login')}</Link>
          </div>
        </div>
      </Layout>
    </IfElse>
  );
};

export interface RegisterProps extends PageComponent {}

export default Register;
