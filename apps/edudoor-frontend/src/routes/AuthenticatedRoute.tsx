import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import useRoleManager from '@edudoor/ui/hooks/useRoleManager';
import Tools from '@edudoor/ui/utils/Tools';
import { Roles } from '@edudoor/ui/components/RolesManager';
import useAuth from '@edudoor/ui/hooks/useAuth';
import useRoutes from '../hooks/useRoutes';
import { EdudoorRoutes } from './index';
import LoadingPage from '../screens/LoadingPage';

function AuthenticatedRoute(props: AuthenticatedRouteProps): JSX.Element {
  const routes = useRoutes();
  const { authenticated } = useAuth();
  const user = useSelector((state: any) => state.users.user);
  const hasAccess = useRoleManager(props.roles);

  if (user.errors.message || user.errors.errors || !authenticated) {
    Tools.clearToken();
    return <Redirect to={props.redirect || routes.login.link} />;
  } else if (authenticated && user.data.user) {
    if (hasAccess) {
      return <Route {...props} />;
    } else {
      return <Redirect to={routes[props.authRedirect].link} />;
    }
  } else {
    return <Route component={LoadingPage} />;
  }
}

export interface AuthenticatedRouteProps extends RouteProps {
  redirect?: string;
  authRedirect: keyof EdudoorRoutes;
  roles: Array<Roles>;
}
export default AuthenticatedRoute;
