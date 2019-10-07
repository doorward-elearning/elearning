import React from 'react';
import Form from '../../util/Form';
import LoginForm from '../../components/LoginForm';
import Api from '../../services/api';

const Login: React.FC = () => {
  const initialState = {};

  const onSubmit = () => {
    Api.registration.register('moses.gitau@andela.com').then(console.log).catch(console.error);
  };
  return (
    <div className="limiter">
      <div className="container-login100 page-background">
        <div className="wrap-login100">
          <Form initialValues={initialState} onSubmit={onSubmit}>
            {LoginForm}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
