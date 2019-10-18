import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import LoginForm, { LoginFormState } from '../../components/LoginForm';
import { LOGIN_USER } from '../../reducers/login';
import { useSelector } from 'react-redux';
import { FormikActions } from 'formik';
import * as Yup from 'yup';
import { State } from '../../store/store';
import { WebComponentState } from '../../reducers/reducers';
import { Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { routes } from '../../routes';
import { useAction } from '../../hooks/useActions';
import Card from '../../components/Card';
import './Login.scss';
import Layout from '../Layout';
import { PageComponent } from '../../types';
import { NavbarFeatures } from '../../components/NavBar';

const Validation = Yup.object().shape({
  username: Yup.string().required('The username is required.'),
  password: Yup.string().required('The password is required.'),
});

const Login: React.FunctionComponent<LoginProps> = props => {
  const { authenticated, authenticate } = useAuth();
  const [state, setState] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState();
  const [actions, setActions] = useState<FormikActions<LoginFormState> | null>(null);
  const initialState = {};
  const loginUser = useAction({ type: LOGIN_USER });

  const login: WebComponentState = useSelector((state: State) => state.login);

  useEffect(() => {
    if (login.data) {
      authenticate(state.username, state.password);
    }
  }, [login.data]);

  useEffect(() => {
    if (actions && errors) {
      actions.setErrors({ username: 'Invalid username / password' });
      actions.setSubmitting(false);
      setErrors(null);
    }
  }, [errors]);

  useEffect(() => {
    setErrors(login.errors);
  }, [login.errors]);

  const onSubmit = (values: LoginFormState, actions: FormikActions<LoginFormState>): void => {
    setActions(actions);
    loginUser(values.username, values.password);
    setState({ ...values });
  };

  return authenticated ? (
    <Redirect to={routes.DASHBOARD} />
  ) : (
    <Layout {...props} navFeatures={[NavbarFeatures.PAGE_LOGO]}>
      <div className="page page__login">
        <Card>
          <Card.Body>
            <Form initialValues={initialState} onSubmit={onSubmit} validationSchema={Validation}>
              {LoginForm}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export interface LoginProps extends PageComponent {}
export default Login;
