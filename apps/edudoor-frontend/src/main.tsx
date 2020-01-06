import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import '@material/react-linear-progress/dist/linear-progress.css';
import { Router } from './routes/routes';
import { EdudoorRoutes } from './routes';
import useApp, { appInitialValue } from './hooks/useApp';
import { RouteDefinitions } from '@edudoor/ui/types';
import RolesManager from '@edudoor/ui/components/RolesManager';
import ApplicationTheme from '@edudoor/ui/components/ApplicationTheme';
import useOfflineToast from '@edudoor/ui/hooks/useOfflineToast';
import ApiRequest from '@edudoor/ui/services/apiRequest';
import { environment } from './environments/environment';

ApiRequest.setBaseURL(environment.REACT_APP_BASE_URL);
// ensure the user is logged in
ApiRequest.setAuth();

const AppInitialValue = {
  ...appInitialValue,
  io: null,
  setIO: () => {},
};

export type AppContextProps = {
  routes: RouteDefinitions<EdudoorRoutes>;
  setTitle: (key: keyof EdudoorRoutes, name: string, link?: string) => void;
  setParams: (key: keyof EdudoorRoutes, params: { [name: string]: any }) => void;
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
