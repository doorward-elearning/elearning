import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import LoginForm, { LoginFormState } from '../../components/LoginForm';
import { LOGIN_USER } from '../../reducers/login';
import { useSelector } from 'react-redux';
import { FormikActions } from 'formik';
import * as Yup from 'yup';
import { State } from '../../store/store';
import { WebComponentState } from '../../reducers/reducers';
import { MemoryHistory } from 'history';
import { Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { routes } from '../../routes';
import { useAction } from '../../hooks/useActions';

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
    <div className="limiter">
      <div className="container-login100 page-background">
        <div className="wrap-login100">
          <Form initialValues={initialState} onSubmit={onSubmit} validationSchema={Validation}>
            {LoginForm}
          </Form>
        </div>
      </div>
    </div>
  );
};

export interface LoginProps {
  history: MemoryHistory;
}
export default Login;
