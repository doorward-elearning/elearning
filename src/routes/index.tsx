import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { generatedRoutes } from './routes';
import NotFound from '../views/NotFound';

const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      {generatedRoutes}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
