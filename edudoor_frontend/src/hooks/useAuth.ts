import Tools from '../utils/Tools';
import Request from '../services/request';
import { useState } from 'react';

const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState(Tools.isLoggedIn);
  const logout = (): void => {
    if (authenticated) {
      Tools.clearToken();
      setAuthenticated(false);
    }
  };
  const authenticate = (username: string, password: string) => {
    if (!authenticated) {
      Tools.setToken(username, password);
      Request.setAuth();
      setAuthenticated(true);
    }
  };

  return {
    authenticated,
    logout,
    authenticate,
  };
};

export interface UseAuth {
  authenticated: boolean;
  logout: () => void;
  authenticate: (username: string, password: string) => void;
}

export default useAuth;
