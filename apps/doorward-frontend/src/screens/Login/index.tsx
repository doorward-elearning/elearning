import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import './Login.scss';
import LoginForm from '../../components/Forms/LoginForm';
import { Link } from 'react-router-dom';
import IfElse from '@doorward/ui/components/IfElse';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import Message from '@doorward/ui/components/Message';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import useOrganization from '../../hooks/useOrganization';
import useAuth from '../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../services/apis/doorward.api';

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const { authenticated, authenticate } = useAuth();
  const organization = useOrganization();
  const { query } = useQueryParams();

  const [, login, clearLogin] = useApiAction(DoorwardApi, (api) => api.auth.login, {
    clearData: true,
    clearErrors: true,
  });
  const [getCurrentUser] = useApiAction(DoorwardApi, (api) => api.auth.getCurrentUser);

  useEffect(() => {
    if (query.newAccount) {
      setShowMessage(true);
    }
  }, []);

  useEffect(() => {
    if (login.data) {
      authenticate(login.data?.token);
      getCurrentUser();
    }
  }, [login.data]);

  if (authenticated) {
    clearLogin();
    return <Redirect to="/dashboard" />;
  }
  return (
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
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
