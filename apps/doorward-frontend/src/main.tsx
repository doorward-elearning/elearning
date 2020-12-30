import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import '@doorward/ui/fonts.scss';
import '@material/react-linear-progress/dist/linear-progress.css';
import { Router } from './routes/routes';
import { DoorwardRoutes } from './routes';
import useApp, { appInitialValue } from './hooks/useApp';
import RolesManager from '@doorward/ui/components/RolesManager';
import ApplicationTheme from '@doorward/ui/components/ApplicationTheme';
import useOfflineToast from '@doorward/ui/hooks/useOfflineToast';
import ApiRequest from '@doorward/common/net/apiRequest';
import ApplicationInitializer from './components/ApplicationInitializer';
import createAppContext, { AppContextProps } from '@doorward/ui/template/appContext';
import useAuth from './hooks/useAuth';

// ensure the user is logged in
ApiRequest.setAuth();

export interface DoorwardAppContextProps extends AppContextProps<DoorwardRoutes> {}

export const AppContext = createAppContext({
  ...appInitialValue,
});

const App: React.FC = () => {
  const app = useApp();
  useOfflineToast();

  const auth = useAuth();

  return (
    <AppContext.Provider value={{ ...app }}>
      <ApplicationTheme theme="base">
        <ApplicationInitializer>
          <RolesManager auth={auth}>
            <Router />
          </RolesManager>
        </ApplicationInitializer>
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
