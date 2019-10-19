import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';
import AuthenticatedRoute from './AuthenticatedRoute';
import Courses from '../views/Courses';

export const routes = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  COURSE_LIST: '/courses/list',
};

const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.LOGIN} exact component={Login} />
      <AuthenticatedRoute path={routes.DASHBOARD} exact component={Dashboard} />
      <AuthenticatedRoute path={routes.COURSE_LIST} exact component={Courses} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
