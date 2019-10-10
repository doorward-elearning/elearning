import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';

const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/event-management" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
