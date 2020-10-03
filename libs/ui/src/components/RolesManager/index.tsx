import React, { FunctionComponent, useEffect, useState } from 'react';
import { UseAuth } from '../../hooks/useAuth';
import UserEntity from '@doorward/common/entities/user.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';

export type RoleEvaluator = (user: UserEntity, organization: OrganizationEntity) => boolean;

export const RolesContext = React.createContext<{ privileges: Array<PrivilegeEntity> }>({
  privileges: [],
});

const RolesManager: FunctionComponent<RolesManagerProps> = (props): JSX.Element => {
  const [privileges, setPrivileges] = useState<Array<PrivilegeEntity>>([]);
  const auth = props.auth;

  const user = auth?.user;

  useEffect(() => {
    if (user && user.role) {
      setPrivileges(user.role.privileges);
    }
  }, [user]);

  return <RolesContext.Provider value={{ privileges }}>{props.children}</RolesContext.Provider>;
};

export interface RolesManagerProps {
  auth: UseAuth;
}

export default RolesManager;
