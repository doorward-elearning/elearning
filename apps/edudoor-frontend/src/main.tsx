import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="*" exact component={App} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
