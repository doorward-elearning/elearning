import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './screens/home';
import Pricing from './screens/pricing';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route component={Pricing} path="/pricing" exact />
        <Route component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
