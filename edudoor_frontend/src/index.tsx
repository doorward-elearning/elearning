import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ApplicationTheme from './components/ui/ApplicationTheme';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Request from './services/request';
import store from './store';
import '@material/react-linear-progress/dist/linear-progress.css';
import ROUTES, { Router } from './routes/routes';
import { routes } from './routes';

Request.setBaseURL(process.env.REACT_APP_BASE_URL);
// ensure the user is logged in
Request.setAuth();

export const appInitialValue = {
  routes: { ...ROUTES },
  setTitle: (key: keyof typeof routes, name: string, link?: string): void => {},
};

export type AppContextProps = typeof appInitialValue;

export const AppContext = React.createContext<AppContextProps>(appInitialValue);

const App: React.FC = () => {
  const [routes, setRoutes] = useState(ROUTES);
  const setTitle = (key: keyof typeof routes, name: string, link?: string): void => {
    const current = routes[key].name;
    link = link || routes[key].link;
    if (current !== name) {
      setRoutes({ ...routes, [key]: { ...routes[key], name, link } });
    }
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ routes, setTitle }}>
        <ApplicationTheme theme="base">
          <Router />
        </ApplicationTheme>
      </AppContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
