import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationTheme from './components/ui/ApplicationTheme';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Request from './services/request';
import store from './store';
import '@material/react-linear-progress/dist/linear-progress.css';
import { Router } from './routes/routes';
import useApp, { appInitialValue } from './hooks/useApp';
import PageProgress from './components/static/UI/PageProgress';
import RolesManager from './components/static/RolesManager';

Request.setBaseURL(process.env.REACT_APP_BASE_URL);
// ensure the user is logged in
Request.setAuth();

export type AppContextProps = typeof appInitialValue;

export const AppContext = React.createContext<AppContextProps>(appInitialValue);

const App: React.FC = () => {
  const app = useApp();
  return (
    <AppContext.Provider value={app}>
      <ApplicationTheme theme="base">
        <PageProgress>
          <RolesManager>
            <Router />
          </RolesManager>
        </PageProgress>
      </ApplicationTheme>
    </AppContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
