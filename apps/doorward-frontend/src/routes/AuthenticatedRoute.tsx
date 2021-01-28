import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import Tools from '@doorward/common/utils/Tools';
import useRoutes from '../hooks/useRoutes';
import { DoorwardRoutes } from './index';
import LoadingPage from '../screens/LoadingPage';
import useAuth from '../hooks/useAuth';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../services/apis/doorward.api';

function AuthenticatedRoute(props: AuthenticatedRouteProps): JSX.Element {
  const routes = useRoutes();
  const { authenticated } = useAuth();
  const [, user] = useApiAction(DoorwardApi, (api) => api.auth.getCurrentUser);
  const hasPrivileges = usePrivileges();

  if (user.errors?.message || user.errors?.errors || !authenticated) {
    Tools.clearToken();
    return <Redirect to={props.redirect || routes.login.link} />;
  } else if (authenticated && user.data?.user) {
    if (hasPrivileges(...props.privileges)) {
      return <Route {...props} />;
    } else {
      return <Redirect to={routes[props.authRedirect || 'login'].link} />;
    }
  } else {
    return <Route component={LoadingPage} />;
  }
}

export interface AuthenticatedRouteProps extends RouteProps {
  redirect?: string;
  authRedirect: keyof DoorwardRoutes;
  privileges: Array<string>;
}
export default AuthenticatedRoute;
