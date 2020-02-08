import React, { FunctionComponent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Role } from '@edudoor/common/models/Role';
import { User } from '@edudoor/common/models/User';
import { Organization } from '@edudoor/common/models/Organization';

export enum Roles {
  SUPER_ADMINISTRATOR = 'Super Administrator',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
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
