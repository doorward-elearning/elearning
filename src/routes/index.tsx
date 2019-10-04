import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
