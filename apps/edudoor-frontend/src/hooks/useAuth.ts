import Tools from '../utils/Tools';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { User } from '../services/models';
import { AppContext } from '../index';
import { connectSocket } from '../utils/socket';

const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState(Tools.isLoggedIn());
  const appContext = useContext(AppContext);

  const users = useSelector((state: State) => state.users.user);
  const [user, setUser] = useState(users.data.user);

  useEffect(() => {
    if (users.data.user) {
      setUser(users.data.user);
    }
  }, [users.data]);

  const logout = useMemo(
    () => (): void => {
      if (authenticated) {
        Tools.clearToken();
        setAuthenticated(false);
        if (appContext.io) {
          appContext.io.close();
          appContext.setIO(null);
        }
      }
    },
    [appContext.io, authenticated]
  );

  const authenticate = useMemo(
    () => (token: string): void => {
      Tools.setToken(token);
      setAuthenticated(true);
      if (appContext.io) {
        appContext.io.close();
      }
      appContext.setIO(connectSocket());
    },
    [appContext.io]
  );

  return {
    authenticated,
    logout,
    authenticate,
    user,
  };
};

export interface UseAuth {
  authenticated: boolean;
  logout: () => void;
  authenticate: (token: string) => void;
  user: User;
}

export default useAuth;
