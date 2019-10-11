import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../hooks/useAuth';
import { routes } from './index';

const AuthenticatedRoute: FunctionComponent<AuthenticatedRoute> = (props): JSX.Element => {
  const { authenticated } = useAuth();
  if (authenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to={props.redirect || routes.LOGIN} />;
  }
};

export interface AuthenticatedRoute extends RouteProps {
  redirect?: string;
}
export default AuthenticatedRoute;
