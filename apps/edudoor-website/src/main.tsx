import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './screens/home';
import Pricing from './screens/pricing';
import { Provider } from 'react-redux';
import store from './store';
import ApplicationTheme from '@edudoor/ui/components/ApplicationTheme';

ReactDOM.render(
  <Provider store={store}>
    <ApplicationTheme theme="base">
      <BrowserRouter>
        <Switch>
          <Route component={Pricing} path="/pricing" exact />
          <Route component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ApplicationTheme>
  </Provider>,
  document.getElementById('root')
);
