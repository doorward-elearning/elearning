import React, { FunctionComponent, useEffect } from 'react';
import '../Login/Login.scss';
import { PageComponent } from '../../types';
import Layout from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import RegistrationForm from '../../components/static/Forms/RegistrationForm';
import Header from '../../components/ui/Header';
import { Link, Redirect } from 'react-router-dom';
import useRoutes from '../../hooks/useRoutes';
import CONSTANTS from '../../assets/constants';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAuth from '../../hooks/useAuth';
import useAction from '../../hooks/useActions';
import { clearLoginAction } from '../../reducers/login/actions';
import IfElse from '../../components/ui/IfElse';

const Register: FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const registration = useSelector((state: State) => state.login.registration);
  const { authenticate, authenticated } = useAuth();
  const routes = useRoutes();
  const clearLogin = useAction(clearLoginAction);

  useEffect(() => {
    if (registration.data) {
      authenticate(registration.data.token);
      clearLogin();
    }
  }, [registration.data]);

  return (
    <IfElse condition={authenticated}>
      <Redirect to={routes.dashboard.link} />
      <Layout {...props} noNavBar navFeatures={[NavbarFeatures.HAMBURGER]} withBackground>
        <div className="page page__login">
          <Header size={1}>{CONSTANTS.APP_NAME}</Header>
          <RegistrationForm />
          <div className="page__login--footer">
            <p>Already have an account?</p>
            <Link to={routes.login.link}>Login</Link>
          </div>
        </div>
      </Layout>
    </IfElse>
  );
};

export interface RegisterProps extends PageComponent {}

export default Register;
