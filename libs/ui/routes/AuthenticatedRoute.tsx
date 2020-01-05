import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { State } from '@edudoor/frontend/src/store';
import useRoleManager from '../hooks/useRoleManager';
import Tools from '../utils/Tools';
import { Roles } from '../components/RolesManager';
import { RouteDefinitions, RouteNames } from '../types';

function AuthenticatedRoute<T extends RouteNames = RouteNames>(props: AuthenticatedRouteProps<T>): JSX.Element {
  const { authenticated } = useAuth();
  const user = useSelector((state: State) => state.users.user);
  const hasAccess = useRoleManager(props.roles);

  if (user.errors.message || user.errors.errors || !authenticated) {
    Tools.clearToken();
    return <Redirect to={props.redirect || props.routes[props.loginPage].link} />;
  } else if (authenticated && user.data.user) {
    if (hasAccess) {
      return <Route {...props} />;
    } else {
      return <Redirect to={props.routes[props.authRedirect].link} />;
    }
  } else {
    return <Route component={props.loadingComponent} />;
  }
}

export interface AuthenticatedRouteProps<T extends RouteNames> extends RouteProps {
  redirect?: string;
  authRedirect: keyof T;
  roles: Array<Roles>;
  routes: RouteDefinitions<T>;
  loadingComponent: React.ComponentType<any>;
  loginPage: keyof T;
}
export default AuthenticatedRoute;
