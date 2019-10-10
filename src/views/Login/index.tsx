import React, { useEffect } from 'react';
import Form from '../../components/Form';
import LoginForm, { LoginFormState } from '../../components/LoginForm';
import { LOGIN_USER } from '../../reducers/login';
import { action } from '../../reducers/builder';
import { useDispatch, useSelector } from 'react-redux';
import { FormikActions } from 'formik';
import * as Yup from 'yup';
import { State } from '../../store/store';
import { WebComponentState } from '../../reducers/reducers';
import Tools from '../../utils/Tools';
import Request from '../../services/request';
import { MemoryHistory } from 'history';
import { Redirect } from 'react-router';

const Validation = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login: React.FunctionComponent<LoginProps> = props => {
  const initialState = {};
  const dispatch = useDispatch();
  const login: WebComponentState = useSelector((state: State) => state.login);

  const onSubmit = (values: LoginFormState, actions: FormikActions<LoginFormState>): void => {
    Tools.setToken(values.username, values.password);
    Request.setAuth();
    dispatch(action(LOGIN_USER, { username: values.username }));
  };

  return login.data ? (
    <Redirect to="/" />
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
