import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationTheme from './components/ui/ApplicationTheme';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Request from './services/request';
import store from './store';
import '@material/react-linear-progress/dist/linear-progress.css';
import ROUTES, { Router } from './routes/routes';
import useApp, { appInitialValue, RouteType } from './hooks/useApp';
import RolesManager from './components/static/RolesManager';
import useOfflineToast from './hooks/useOfflineToast';

Request.setBaseURL(process.env.REACT_APP_BASE_URL);
// ensure the user is logged in
Request.setAuth();

const AppInitialValue = {
  ...appInitialValue,
  io: null,
  setIO: () => {},
};

export type AppContextProps = {
  routes: typeof ROUTES;
  setTitle: (key: keyof RouteType, name: string, link?: string) => void;
  setParams: (key: keyof RouteType, params: { [name: string]: any }) => void;
  io: SocketIOClient.Socket | null;
  setIO: (io: SocketIOClient.Socket | null) => void;
};

export const AppContext = React.createContext<AppContextProps>(AppInitialValue);

const App: React.FC = () => {
  const app = useApp();
  useOfflineToast();

  return (
    <AppContext.Provider value={{ ...app }}>
      <ApplicationTheme theme="base">
        <RolesManager>
          <Router />
        </RolesManager>
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
