import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
