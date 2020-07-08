import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import './Login.scss';
import Layout from '../Layout';
import { clearLoginAction } from '../../reducers/login/actions';
import { State } from '../../store';
import LoginForm from '../../components/Forms/LoginForm';
import useRoutes from '../../hooks/useRoutes';
import { Link } from 'react-router-dom';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import { ROUTES } from '../../routes/routes';
import Button from '@doorward/ui/components/Buttons/Button';
import IfElse from '@doorward/ui/components/IfElse';
import useAction from '@doorward/ui/hooks/useActions';
import useAuth from '@doorward/ui/hooks/useAuth';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import Message from '@doorward/ui/components/Message';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import useOrganization from '@doorward/ui/hooks/useOrganization';

const Login: React.FunctionComponent<LoginProps> = props => {
  const [showMessage, setShowMessage] = useState(false);
  const { authenticated, authenticate } = useAuth();
  const clearLogin = useAction(clearLoginAction);
  const organization = useOrganization();
  const { query } = useQueryParams();

  const routes = useRoutes();
  const login = useSelector((state: State) => state.login.loginUser);

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
      <Layout
        {...props}
        withBackground
        noNavBar
        navFeatures={[NavbarFeatures.PAGE_LOGO]}
        renderNavEnd={() => (
          <Button theme="secondary" onClick={() => routes.navigate(routes.register)}>
            Register
          </Button>
        )}
      >
        <div className="page page__login">
          <Header size={1}>{organization.name}</Header>
          <IfElse condition={showMessage}>
            <Message>
              <Header size={4}>Thank you for trying Doorward. Please login to proceed.</Header>
            </Message>
          </IfElse>
          <LoginForm />
          <div className="page__login--footer">
            <p>Don&apos;t have an account?</p>
            <Link to={routes.register.link}>Create a new account</Link>
          </div>
        </div>
      </Layout>
    </IfElse>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;