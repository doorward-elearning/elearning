import React, { FunctionComponent, useEffect } from 'react';
import '../Login/Login.scss';
import Layout from '../Layout';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import { Link, Redirect } from 'react-router-dom';
import useRoutes from '../../hooks/useRoutes';
import CONSTANTS from '../../assets/constants';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { clearLoginAction } from '../../reducers/login/actions';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';
import IfElse from '@edudoor/ui/components/IfElse';
import useAction from '@edudoor/ui/hooks/useActions';
import useAuth from '@edudoor/ui/hooks/useAuth';
import { PageComponent } from '@edudoor/ui/types';
import Header from '@edudoor/ui/components/Header';

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
