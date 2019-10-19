import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';
import AuthenticatedRoute from './AuthenticatedRoute';

export const routes = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};

const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <AuthenticatedRoute path={routes.DASHBOARD} exact component={Dashboard} />
      <Route path={routes.LOGIN} exact component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
