import { useContext } from 'react';
import { RolesContext } from '@doorward/ui/components/RolesManager';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';
import UserEntity from '@doorward/common/entities/user.entity';

export type UsePrivileges = (...privileges: Array<string>) => boolean;

const hasPrivilege = (privilege: string, privileges: Array<PrivilegeEntity>) => {
  return !privileges ? true : !!privileges.find((pr) => wildcardPattern(pr.name, privilege));
};

const usePrivileges = (currentUser?: UserEntity): UsePrivileges => {
  const { privileges } = useContext(RolesContext);

  return (...userPrivileges: Array<string>) =>
    userPrivileges
      ? !userPrivileges.find(
          (privilege) =>
            !hasPrivilege(privilege, [...privileges, ...((currentUser?.role?.privileges as PrivilegeEntity[]) || [])])
        )
      : true;
};

export default usePrivileges;
