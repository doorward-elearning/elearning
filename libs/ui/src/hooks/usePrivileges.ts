import { useContext } from 'react';
import { RolesContext } from '@doorward/ui/components/RolesManager';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';

export type UsePrivileges = (...privileges: Array<string>) => boolean;

const hasPrivilege = (privilege: string, privileges: Array<PrivilegeEntity>) => {
  return !privileges ? true : !!privileges.find((pr) => wildcardPattern(pr.name, privilege));
};

const usePrivileges = (): UsePrivileges => {
  const { privileges } = useContext(RolesContext);

  return (...userPrivileges: Array<string>) =>
    userPrivileges ? !userPrivileges.find((privilege) => !hasPrivilege(privilege, privileges)) : true;
};

export default usePrivileges;
