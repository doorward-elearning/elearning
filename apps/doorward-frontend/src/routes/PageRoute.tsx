import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import Tools from '@doorward/common/utils/Tools';
import LoadingPage from '../screens/LoadingPage';
import useAuth from '../hooks/useAuth';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../services/apis/doorward.api';
import ROUTES from '@doorward/common/frontend/routes/main';

function PageRoute(props: AuthenticatedRouteProps): JSX.Element {
  const { authenticated } = useAuth();
  const [, user] = useApiAction(DoorwardApi, (api) => api.auth.getCurrentUser);
  const hasPrivileges = usePrivileges(user.data?.user);

  if (props.public) {
    return <Route {...props} />;
  }

  if (user.errors?.message || user.errors?.errors || !authenticated) {
    Tools.clearToken();
    return <Redirect to={props.unAuthenticatedPath} />;
  } else if (authenticated && user.data?.user) {
    if (hasPrivileges(...props.privileges)) {
      return <Route {...props} />;
    } else {
      return <Redirect to={props.unAuthorizedPath} />;
    }
  } else {
    return <Route component={LoadingPage} />;
  }
}

PageRoute.defaultProps = {
  privileges: [],
  unAuthenticatedPath: ROUTES.auth.login,
  unAuthorizedPath: ROUTES.dashboard,
  public: false,
  exact: true,
};

export interface AuthenticatedRouteProps extends RouteProps {
  unAuthenticatedPath?: string;
  unAuthorizedPath?: string;
  privileges?: Array<string>;
  public?: boolean;
  exact?: boolean;
}

export default PageRoute;
