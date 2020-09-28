import React, { FunctionComponent, useEffect, useState } from 'react';
import { UseAuth } from '../../hooks/useAuth';
import UserEntity from '@doorward/common/entities/user.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import RoleEntity from '@doorward/common/entities/role.entity';

export type RoleEvaluator = (user: UserEntity, organization: OrganizationEntity) => boolean;

export const RolesContext = React.createContext<{ userRoles: Array<RoleEntity> }>({
  userRoles: [],
});

const RolesManager: FunctionComponent<RolesManagerProps> = (props): JSX.Element => {
  const [userRoles, setUserRoles] = useState<Array<RoleEntity>>([]);
  const auth = props.auth;

  const user = auth?.user;

  useEffect(() => {
    if (user && user.role) {
      setUserRoles([user.role]);
    }
  }, [user]);

  return <RolesContext.Provider value={{ userRoles }}>{props.children}</RolesContext.Provider>;
};

export interface RolesManagerProps {
  auth: UseAuth;
}

export default RolesManager;
