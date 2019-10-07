import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import Request from './services/request';

Request.setBaseURL(process.env.REACT_APP_BASE_URL);
// to prevent auth basic popup
Request.setHeader('X-Requested-With','XMLHttpRequest');
Request.setAuth('administrator', 'openolat');

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
