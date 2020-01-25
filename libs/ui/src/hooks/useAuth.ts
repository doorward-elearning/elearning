import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Tools from '@edudoor/common/utils/Tools';
import { User } from '@edudoor/common/models/User';

const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState(Tools.isLoggedIn());

  const users = useSelector((state: any) => state.users.user);
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
      }
    },
    [authenticated]
  );

  const authenticate = useMemo(
    () => (token: string): void => {
      if (token) {
        Tools.setToken(token);
        setAuthenticated(true);
      }
    },
    []
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
