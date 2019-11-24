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

const Login: React.FunctionComponent<LoginProps> = props => {
  const { authenticated, authenticate } = useAuth();
  const clearLogin = useAction(clearLoginAction);

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
      navFeatures={[NavbarFeatures.PAGE_LOGO]}
      renderNavEnd={() => <Button theme="secondary">Register</Button>}
    >
      <div className="page page__login">
        <LoginForm />
      </div>
    </Layout>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
