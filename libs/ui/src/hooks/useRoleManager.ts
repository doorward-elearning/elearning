import { useContext } from 'react';
import { Roles, RolesContext } from '../components/RolesManager';
import { Role } from '@edudoor/common/models';

const useRoleManager = (roles?: Array<Roles>, superAdmin = true): boolean => {
  const { userRoles } = useContext(RolesContext);
  if (roles && userRoles && userRoles.length) {
    const allRoles: Array<Roles> = superAdmin
      ? [Roles.SUPER_ADMINISTRATOR]
      : [];
    allRoles.push(...roles);

    const hasRole = (role: Role): boolean =>
      !!allRoles.find(userRole => [role.name, Roles.ALL].includes(userRole));

    return !!userRoles.find(hasRole);
  } else {
    return true;
  }
};

export default useRoleManager;