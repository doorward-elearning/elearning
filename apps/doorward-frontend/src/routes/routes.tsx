import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Error404 from '../screens/ErrorPages/Error404';
import { routeConfigurations } from './index';
import AuthenticatedRoute from './AuthenticatedRoute';
import { generate } from '@doorward/ui/routes/routes';
import { routeNames } from './routeNames';
import useOrganization from '../hooks/useOrganization';

let generatedRoutes = generate(routeNames(), routeConfigurations, (props) => {
  if (props.privileges.length) {
    return <AuthenticatedRoute {...props} />;
  } else {
    return <Route {...props} />;
  }
});

export let ROUTES = generatedRoutes.routes;

export const Router: React.FunctionComponent<any> = (): JSX.Element => {
  const organization = useOrganization();

  useEffect(() => {
    generatedRoutes = generate(routeNames(), routeConfigurations, (props) => {
      if (props.privileges.length) {
        return <AuthenticatedRoute {...props} />;
      } else {
        return <Route {...props} />;
      }
    });
    ROUTES = generatedRoutes.routes;
  }, [organization]);
  return (
    <BrowserRouter>
      <Switch>
        {generatedRoutes.renderRoutes}
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};
