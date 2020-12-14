import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import './Login.scss';
import LoginForm from '../../components/Forms/LoginForm';
import useRoutes from '../../hooks/useRoutes';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import IfElse from '@doorward/ui/components/IfElse';
import useAction from '@doorward/ui/hooks/useActions';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import Message from '@doorward/ui/components/Message';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import useOrganization from '../../hooks/useOrganization';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import useAuth from '../../hooks/useAuth';
import { clearLoginAction } from '../../reducers/auth/actions';
import translate from '@doorward/common/lang/translate';

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const { authenticated, authenticate } = useAuth();
  const clearLogin = useAction(clearLoginAction);
  const organization = useOrganization();
  const { query } = useQueryParams();

  const routes = useRoutes();
  const login = useDoorwardApi((state) => state.auth.login);

  useEffect(() => {
    if (query.newAccount) {
      setShowMessage(true);
    }
  }, []);

  useEffect(() => {
    if (login.data) {
      authenticate(login.data.token);
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
