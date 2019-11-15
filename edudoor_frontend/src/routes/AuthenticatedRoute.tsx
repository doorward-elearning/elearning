import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../hooks/useAuth';
import ROUTES from './routes';
import { useSelector } from 'react-redux';
import { State } from '../store';
import ContentSpinner from '../components/static/UI/ContentSpinner';
import Tools from '../utils/Tools';
import { Roles } from '../components/static/RolesManager';
import { routes } from './index';
import useRoutes from '../hooks/useRoutes';
import useRoleManager from '../hooks/useRoleManager';

const AuthenticatedRoute: FunctionComponent<AuthenticatedRouteProps> = (props): JSX.Element => {
  const { authenticated } = useAuth();
  const user = useSelector((state: State) => state.users.user);
  const routes = useRoutes();

  if (user.errors.message || user.errors.errors || !authenticated) {
    Tools.clearToken();
    return <Redirect to={props.redirect || ROUTES.login.link} />;
  } else if (authenticated && user.data.user) {
    // check if the user can see this page.
    const hasAccess = useRoleManager(props.roles);
    if (hasAccess) {
      return <Route {...props} />;
    } else {
      return <Redirect to={routes[props.authRedirect].link} />;
    }
  } else {
    return (
      <div style={{ height: '100vh' }}>
        <ContentSpinner type="Grid" />
      </div>
    );
  }
};

export interface AuthenticatedRouteProps extends RouteProps {
  redirect?: string;
  authRedirect: keyof typeof routes;
  roles: Array<Roles>;
}
export default AuthenticatedRoute;
