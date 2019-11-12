import Tools from '../utils/Tools';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { User } from '../services/models';

const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState(Tools.isLoggedIn);

  const users = useSelector((state: State) => state.users.user);

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
    user: users.data.user,
  };
};

export interface UseAuth {
  authenticated: boolean;
  logout: () => void;
  authenticate: () => void;
  user: User;
}

export default useAuth;
