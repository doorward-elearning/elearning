import React from 'react';
import ReactDOM from 'react-dom';
import '@doorward/ui/fonts.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApplicationTheme from '@doorward/ui/components/ApplicationTheme';
import Error404 from './screens/Error404';
import Home from './screens/Home';
import Meeting from './screens/Meeting';

const App: React.FunctionComponent<AppProps> = (props): JSX.Element => {
  return (
    <React.StrictMode>
      <ApplicationTheme theme="base">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/meeting/:meetingId" component={Meeting} />
            <Route exact component={Error404} />
          </Switch>
        </BrowserRouter>
      </ApplicationTheme>
    </React.StrictMode>
  );
};

export interface AppProps {}

ReactDOM.render(<App />, document.getElementById('root'));
