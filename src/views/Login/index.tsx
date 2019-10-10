import React from 'react';
import Form from '../../components/Form';
import LoginForm from '../../components/LoginForm';
import { LOGIN_USER } from '../../reducers/login';
import { createAction } from '../../reducers/builder';
import { useDispatch, useSelector } from 'react-redux';
import { FormikActions } from 'formik';
import * as Yup from 'yup';
import { State } from '../../store/store';
import { WebComponentState } from '../../reducers/reducers';
import { LoginFormState } from '../../components/components';

const Validation = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login: React.FC = () => {
  const initialState = {};
  const dispatch = useDispatch();
  const login: WebComponentState = useSelector((state: State) => state.login);

  const onSubmit = (
    values: LoginFormState,
    actions: FormikActions<LoginFormState>
  ): void => {
    dispatch(createAction(LOGIN_USER, values.username));
  };

  return (
    <div className="limiter">
      <div className="container-login100 page-background">
        <div className="wrap-login100">
          <Form
            initialValues={initialState}
            onSubmit={onSubmit}
            validationSchema={Validation}
          >
            {LoginForm}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
