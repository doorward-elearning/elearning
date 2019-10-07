import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard"  exact compponent={Dashboard}/>
      <Route path="/login" exact component={Login}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
