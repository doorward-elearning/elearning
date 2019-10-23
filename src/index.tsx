import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Router from './routes';
import { Provider } from 'react-redux';
import Request from './services/request';
import store from './store';
import ApplicationTheme from './components/ui/ApplicationTheme';
import '@material/react-linear-progress/dist/linear-progress.css';

Request.setBaseURL(process.env.REACT_APP_BASE_URL);
// ensure the user is logged in
Request.setAuth();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApplicationTheme theme="base">
        <Router />
      </ApplicationTheme>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
