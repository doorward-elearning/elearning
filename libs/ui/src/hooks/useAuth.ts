import { useCallback, useEffect, useState } from 'react';
import Tools from '@doorward/common/utils/Tools';
import UserEntity from '@doorward/common/entities/user.entity';

const useAuth = (currentUser: UserEntity): UseAuth => {
  const [authenticated, setAuthenticated] = useState(Tools.isLoggedIn());

  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const logout = useCallback((): void => {
    if (authenticated) {
      Tools.clearToken();
      setAuthenticated(false);
    }
  }, [authenticated]);

  const authenticate = useCallback((token: string): void => {
    if (token) {
      Tools.setToken(token);
      setAuthenticated(true);
    }
  }, []);

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
  user: UserEntity;
}

export default useAuth;
