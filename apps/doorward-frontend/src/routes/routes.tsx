import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routeConfigurations } from './index';
import AuthenticatedRoute from './AuthenticatedRoute';
import { generate } from '@doorward/ui/routes/routes';
import { routeNames } from './routeNames';
import useOrganization from '../hooks/useOrganization';
import LoadingPage from '../screens/LoadingPage';
import Error404 from '../screens/ErrorPages/Error404';

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
      <Suspense fallback={LoadingPage}>
        <Switch>
          {generatedRoutes.renderRoutes}
          <Route path="*" component={Error404} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
