import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Error404 from '../screens/ErrorPages/Error404';
import { routeConfigurations} from './index';
import AuthenticatedRoute from './AuthenticatedRoute';
import { generate } from '@edudoor/ui/routes/routes';
import { routeNames } from './routeNames';

const generatedRoutes = generate(routeNames, routeConfigurations, props => {
  if (props.roles.length) {
    return <AuthenticatedRoute {...props} />;
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
