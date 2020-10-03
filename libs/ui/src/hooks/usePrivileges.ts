import { useContext } from 'react';
import { RolesContext } from '@doorward/ui/components/RolesManager';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';

const hasPrivilege = (privilege: string, privileges: Array<PrivilegeEntity>) => {
  return !!privileges.find((pr) => wildcardPattern(pr.name, privilege));
};

const usePrivileges = (): ((...privileges: Array<string>) => boolean) => {
  const { privileges } = useContext(RolesContext);

  return (...userPrivileges: Array<string>) =>
    userPrivileges ? !userPrivileges.find((privilege) => !hasPrivilege(privilege, privileges)) : true;
};

export default usePrivileges;
