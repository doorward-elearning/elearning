import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import useRoleManager from '@doorward/ui/hooks/useRoleManager';
import Tools from '@doorward/common/utils/Tools';
import { RoleEvaluator, Roles } from '@doorward/ui/components/RolesManager';
import useAuth from '@doorward/ui/hooks/useAuth';
import useRoutes from '../hooks/useRoutes';
import { DoorwardRoutes } from './index';
import LoadingPage from '../screens/LoadingPage';

function AuthenticatedRoute(props: AuthenticatedRouteProps): JSX.Element {
  const routes = useRoutes();
  const { authenticated } = useAuth();
  const user = useSelector((state: any) => state.users.user);
  const hasAccess = useRoleManager(props.roles, true, user.data.user);

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
  authRedirect: keyof DoorwardRoutes;
  roles: Array<Roles | RoleEvaluator>;
}
export default AuthenticatedRoute;
