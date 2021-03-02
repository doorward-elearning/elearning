import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import './Login.scss';
import LoginForm from '../../components/Forms/LoginForm';
import { Link } from 'react-router-dom';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import Message from '@doorward/ui/components/Message';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import useOrganization from '../../hooks/useOrganization';
import useAuth from '../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';
import Layout from '../Layout';

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const { authenticated } = useAuth();
  const organization = useOrganization();
  const { query } = useQueryParams();

  useEffect(() => {
    if (query.newAccount) {
      setShowMessage(true);
    }
  }, []);

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Layout {...props} noNavBar withBackground hideBackButton>
      <div className="page page__login">
        <Header size={1}>{organization.name}</Header>
        {showMessage && (
          <Message>
            <Header size={4}>{translate('thankYouForTryingDoorwardLoginToProceed')}</Header>
          </Message>
        )}
        <LoginForm />
        <div className="page__login--footer">
          <p>{translate('dontHaveAnAccount')}</p>
          <Link to="/register">{translate('createANewAccount')}</Link>
        </div>
      </div>
    </Layout>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
