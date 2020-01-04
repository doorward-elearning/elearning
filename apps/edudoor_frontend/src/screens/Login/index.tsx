import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import useAuth from '../../../../../libs/ui/hooks/useAuth';
import './Login.scss';
import Layout from '../Layout';
import { PageComponent } from '../../../../../libs/ui/types';
import { NavbarFeatures } from '../../../../../libs/ui/components/NavBar';
import ROUTES from '../../../../../libs/ui/routes/routes';
import { clearLoginAction } from '../../reducers/login/actions';
import useAction from '../../../../../libs/ui/hooks/useActions';
import { State } from '../../store';
import LoginForm from '../../components/Forms/LoginForm';
import Button from '../../../../../libs/ui/components/Buttons/Button';
import useRoutes from '../../../../../libs/ui/hooks/useRoutes';
import Header from '../../../../../libs/ui/components/Header';
import CONSTANTS from '../../assets/constants';
import { Link } from 'react-router-dom';
import IfElse from '../../../../../libs/ui/components/IfElse';

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
