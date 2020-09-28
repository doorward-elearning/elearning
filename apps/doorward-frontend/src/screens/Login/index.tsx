import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import './Login.scss';
import Layout, { LayoutFeatures } from '../Layout';
import { clearLoginAction } from '../../reducers/login/actions';
import LoginForm from '../../components/Forms/LoginForm';
import useRoutes from '../../hooks/useRoutes';
import { Link } from 'react-router-dom';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import { ROUTES } from '../../routes/routes';
import Button from '@doorward/ui/components/Buttons/Button';
import IfElse from '@doorward/ui/components/IfElse';
import useAction from '@doorward/ui/hooks/useActions';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import Message from '@doorward/ui/components/Message';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import useOrganization from '@doorward/ui/hooks/useOrganization';
import COVID19Banner from '@doorward/ui/components/COVID19Banner';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import useAuth from '../../hooks/useAuth';

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
      <Layout
        {...props}
        withBackground
        features={[LayoutFeatures.ANNOUNCEMENT]}
        noNavBar
        navFeatures={[NavbarFeatures.PAGE_LOGO]}
        announcement={() => <COVID19Banner />}
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
