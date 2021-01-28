import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import './Login.scss';
import LoginForm from '../../components/Forms/LoginForm';
import useRoutes from '../../hooks/useRoutes';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
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

  const routes = useRoutes();
  const [, login, clearLogin] = useApiAction(DoorwardApi, (api) => api.auth.login);

  useEffect(() => {
    if (query.newAccount) {
      setShowMessage(true);
    }
  }, []);

  useEffect(() => {
    if (login.data) {
      authenticate(login.data?.token);
      clearLogin();
    }
  }, [login.data]);
  return (
    <IfElse condition={authenticated}>
      <Redirect to={ROUTES.dashboard.link} />
      <div className="page page__login">
        <Header size={1}>{organization.name}</Header>
        <IfElse condition={showMessage}>
          <Message>
            <Header size={4}>{translate('thankYouForTryingDoorwardLoginToProceed')}</Header>
          </Message>
        </IfElse>
        <LoginForm />
        <div className="page__login--footer">
          <p>{translate('dontHaveAnAccount')}</p>
          <Link to={routes.register.link}>{translate('createANewAccount')}</Link>
        </div>
      </div>
    </IfElse>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
