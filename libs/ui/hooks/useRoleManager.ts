import { Roles, RolesContext } from '@edudoor/frontend/src/components/RolesManager';
import { useContext } from 'react';
import { Role } from '@edudoor/frontend/src/services/models';

const useRoleManager = (roles?: Array<Roles>, superAdmin = true): boolean => {
  const { userRoles } = useContext(RolesContext);
  if (roles && userRoles && userRoles.length) {
    const allRoles: Array<Roles> = superAdmin ? [Roles.SUPER_ADMINISTRATOR] : [];
    allRoles.push(...roles);

    const hasRole = (role: Role): boolean => !!allRoles.find(userRole => [role.name, Roles.ALL].includes(userRole));

    return !!userRoles.find(hasRole);
  } else {
    return true;
  }
};

export default useRoleManager;
