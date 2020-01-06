import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import './Login.scss';
import Layout from '../Layout';
import { clearLoginAction } from '../../reducers/login/actions';
import { State } from '../../store';
import LoginForm from '../../components/Forms/LoginForm';
import useRoutes from '../../hooks/useRoutes';
import CONSTANTS from '../../assets/constants';
import { Link } from 'react-router-dom';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';
import { ROUTES } from '../../routes/routes';
import Button from '@edudoor/ui/components/Buttons/Button';
import IfElse from '@edudoor/ui/components/IfElse';
import useAction from '@edudoor/ui/hooks/useActions';
import useAuth from '@edudoor/ui/hooks/useAuth';
import { PageComponent } from '@edudoor/ui/types';
import Header from '@edudoor/ui/components/Header';

const Login: React.FunctionComponent<LoginProps> = props => {
  const { authenticated, authenticate } = useAuth();
  const clearLogin = useAction(clearLoginAction);

  const routes = useRoutes();
  const login = useSelector((state: State) => state.login.loginUser);

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
          <Header size={1}>{CONSTANTS.APP_NAME}</Header>
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