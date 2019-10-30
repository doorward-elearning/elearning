import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormikActions, FormikProps } from 'formik';
import { WebComponentState } from '../../reducers/reducers';
import { Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';
import './Login.scss';
import Layout from '../Layout';
import { PageComponent } from '../../types';
import { NavbarFeatures } from '../../components/ui/NavBar';
import ProgressBar from '../../components/ui/ProgressBar';
import IfElse from '../../components/ui/IfElse';
import LoginForm, { LoginFormState } from '../../components/static/Forms/LoginForm';
import Card from '../../components/ui/Card';
import Form from '../../components/ui/Form';
import ROUTES from '../../routes/routes';
import { clearLoginAction, loginUserAction } from '../../reducers/login/actions';
import useAction from '../../hooks/useActions';
import loginForm from '../../components/static/Forms/validations/loginForm';
import { State } from '../../store/store';

const Login: React.FunctionComponent<LoginProps> = props => {
  const { authenticated, authenticate } = useAuth();
  const initialState = {};
  const loginUser = useAction(loginUserAction);
  const clearLogin = useAction(clearLoginAction);

  const login = useSelector((state: State) => state.login);

  useEffect(() => {
    if (login.data) {
      authenticate();
      clearLogin();
    }
  }, [login.data]);

  const onSubmit = (values: LoginFormState, actions: FormikActions<LoginFormState>): void => {
    loginUser(values);
  };

  return authenticated ? (
    <Redirect to={ROUTES.dashboard.link} />
  ) : (
    <Layout {...props} navFeatures={[NavbarFeatures.PAGE_LOGO]}>
      <div className="page page__login">
        <Form initialValues={initialState} onSubmit={onSubmit} validationSchema={loginForm} state={login}>
          {(props: FormikProps<LoginFormState>): JSX.Element => (
            <Card>
              <Card.Header>
                <IfElse condition={props.isSubmitting}>
                  <ProgressBar />
                </IfElse>
              </Card.Header>
              <Card.Body>
                <LoginForm {...props} />
              </Card.Body>
            </Card>
          )}
        </Form>
      </div>
    </Layout>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
