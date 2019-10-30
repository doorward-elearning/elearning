import Tools from '../utils/Tools';
import { useState } from 'react';

const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState(Tools.isLoggedIn);
  const logout = (): void => {
    if (authenticated) {
      Tools.clearToken();
      setAuthenticated(false);
    }
  };
  const authenticate = (): void => {
    if (!authenticated && Tools.isLoggedIn()) {
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
  authenticate: () => void;
}

export default useAuth;
