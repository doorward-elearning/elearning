import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import '@doorward/ui/fonts.scss';
import '@material/react-linear-progress/dist/linear-progress.css';
import 'react-virtualized/styles.css'; // only needs to be imported once
import RolesManager from '@doorward/ui/components/RolesManager';
import ApplicationTheme from '@doorward/ui/components/ApplicationTheme';
import useOfflineToast from '@doorward/ui/hooks/useOfflineToast';
import ApiRequest from '@doorward/common/net/apiRequest';
import ApplicationInitializer from './components/ApplicationInitializer';
import useAuth from './hooks/useAuth';
import ChatWebSocketContext from '@doorward/chat/components/ChatWebSocketContext';
import Notifications from '@doorward/ui/components/Notifications';
import { BrowserRouter } from 'react-router-dom';
import ROUTES from '@doorward/common/frontend/routes/main';
import Router from './routes';

// ensure the user is logged in
ApiRequest.setAuth();

const App: React.FC = () => {
  useOfflineToast();

  const auth = useAuth();

  return (
    <ApplicationTheme theme="base">
      <Notifications>
        <ApplicationInitializer>
          <BrowserRouter>
            <RolesManager auth={auth}>
              <ChatWebSocketContext auth={auth} path={ROUTES.chat.home}>
                <Router />
              </ChatWebSocketContext>
            </RolesManager>
          </BrowserRouter>
        </ApplicationInitializer>
      </Notifications>
    </ApplicationTheme>
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
