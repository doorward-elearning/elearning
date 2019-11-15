import { Roles, RolesContext } from '../components/static/RolesManager';
import { useContext } from 'react';
import { Role } from '../services/models';

const useRoleManager = (roles?: Array<Roles>): boolean => {
  const { userRoles } = useContext(RolesContext);
  if (roles && userRoles) {
    const allRoles: Array<Roles> = [Roles.SUPER_ADMINISTRATOR];
    allRoles.push(...roles);

    const hasRole = (role: Role): boolean => !!allRoles.find(userRole => [role.name, Roles.ALL].includes(userRole));

    return !!userRoles.find(hasRole);
  } else {
    return true;
  }
};

export default useRoleManager;
