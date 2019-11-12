import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../hooks/useAuth';
import ROUTES from './routes';
import { useSelector } from 'react-redux';
import { State } from '../store';
import ContentSpinner from '../components/static/UI/ContentSpinner';
import Tools from '../utils/Tools';

const AuthenticatedRoute: FunctionComponent<AuthenticatedRouteProps> = (props): JSX.Element => {
  const { authenticated } = useAuth();
  const user = useSelector((state: State) => state.users.user);
  if (user.errors.message || user.errors.errors) {
    Tools.clearToken();
    return <Redirect to={props.redirect || ROUTES.login.link} />;
  } else if (authenticated && user.data.user) {
    return <Route {...props} />;
  } else {
    return (
      <div style={{ height: '100vh' }}>
        <ContentSpinner />
      </div>
    );
  }
};

export interface AuthenticatedRouteProps extends RouteProps {
  redirect?: string;
}
export default AuthenticatedRoute;
