import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Error404 from '../screens/ErrorPages/Error404';
import { generatedRoutes } from '../../../../libs/ui/routes/routes';

export const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      {generatedRoutes}
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);
