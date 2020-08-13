import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Tools from '@doorward/common/utils/Tools';
import { User } from '@doorward/common/models/User';
import { Roles } from '@doorward/ui/components/RolesManager';

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

  const isMember = () => {
    return user?.roles?.length && user.roles.find(role => role.name === Roles.MEMBER);
  };

  const isModerator = () => {
    return user?.roles?.length && user.roles.find(role => role.name === Roles.MODERATOR);
  };

  return {
    authenticated,
    logout,
    authenticate,
    user,
    isMember,
    isModerator,
  };
};

export interface UseAuth {
  authenticated: boolean;
  logout: () => void;
  authenticate: (token: string) => void;
  user: User;
  isMember: () => boolean;
  isModerator: () => boolean;
}

export default useAuth;
