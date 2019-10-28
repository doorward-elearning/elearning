import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../hooks/useAuth';
import ROUTES from './routes';

const AuthenticatedRoute: FunctionComponent<AuthenticatedRouteProps> = (props): JSX.Element => {
  const { authenticated } = useAuth();
  if (authenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to={props.redirect || ROUTES.login.link} />;
  }
};

export interface AuthenticatedRouteProps extends RouteProps {
  redirect?: string;
}
export default AuthenticatedRoute;
