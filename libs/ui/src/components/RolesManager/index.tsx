import React, { FunctionComponent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Role } from '@doorward/common/models/Role';
import { User } from '@doorward/common/models/User';
import { Organization } from '@doorward/common/models/Organization';

export enum Roles {
  SUPER_ADMINISTRATOR = 'Super Administrator',
  MODERATOR = 'Moderator',
  MEMBER = 'Member',
  ALL = 'All',
}

export type RoleEvaluator = (user: User, organization: Organization) => boolean;

export const RolesContext = React.createContext<{ userRoles: Array<Role> }>({
  userRoles: [],
});

const RolesManager: FunctionComponent<RolesManagerProps> = (props): JSX.Element => {
  const [userRoles, setUserRoles] = useState<Array<Role>>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.roles) {
      setUserRoles(user.roles);
    }
  }, [user]);

  return <RolesContext.Provider value={{ userRoles }}>{props.children}</RolesContext.Provider>;
};

export interface RolesManagerProps {}

export default RolesManager;
