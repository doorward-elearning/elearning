import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';
import './Login.scss';
import Layout from '../Layout';
import { PageComponent } from '../../types';
import { NavbarFeatures } from '../../components/ui/NavBar';
import ROUTES from '../../routes/routes';
import { clearLoginAction } from '../../reducers/login/actions';
import useAction from '../../hooks/useActions';
import { State } from '../../store';
import LoginForm from '../../components/static/Forms/LoginForm';
import Button from '../../components/ui/Buttons/Button';
import useRoutes from '../../hooks/useRoutes';
import Header from '../../components/ui/Header';
import CONSTANTS from '../../assets/constants';
import { Link } from 'react-router-dom';

const Login: React.FunctionComponent<LoginProps> = props => {
  const { authenticated, authenticate } = useAuth();
  const clearLogin = useAction(clearLoginAction);

  const routes = useRoutes();
  const login = useSelector((state: State) => state.login.loginUser);

  useEffect(() => {
    if (login.data) {
      authenticate();
      clearLogin();
    }
  }, [login.data]);
  return authenticated ? (
    <Redirect to={ROUTES.dashboard.link} />
  ) : (
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
        <Header size={2}>{CONSTANTS.APP_NAME}</Header>
        <LoginForm />
        <div className="page__login--footer">
          <p>Don&apos;t have an account?</p>
          <Link to={routes.register.link}>Create a new account</Link>
        </div>
      </div>
    </Layout>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
