import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Error404 from '../screens/ErrorPages/Error404';
import { generate } from '@edudoor/ui/src/routes/routes';
import { routeConfigurations, routeNames } from './index';
import AuthenticatedRoute from '@edudoor/ui/src/routes/AuthenticatedRoute';
import LoadingPage from '../screens/LoadingPage';
import useRoutes from '../hooks/useRoutes';

const generatedRoutes = generate(routeNames, routeConfigurations, props => {
  const routes = useRoutes();
  if (props.roles.length) {
    return <AuthenticatedRoute {...props} routes={routes.routes} loadingComponent={LoadingPage} loginPage="login" />;
  } else {
    return <Route {...props} />;
  }
});

export const ROUTES = generatedRoutes.routes;

export const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      {generatedRoutes.renderRoutes}
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);
