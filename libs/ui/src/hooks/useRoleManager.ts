import { useContext } from 'react';
import { RoleEvaluator, Roles, RolesContext } from '../components/RolesManager';
import { Role } from '@edudoor/common/models/Role';
import useOrganization from './useOrganization';
import { User } from '@edudoor/common/models/User';

const useRoleManager = (roles?: Array<Roles | RoleEvaluator>, superAdmin = true, user?: User): boolean => {
  const { userRoles } = useContext(RolesContext);
  const organization = useOrganization();
  const evaluators = (roles || []).filter(role => {
    return (role as RoleEvaluator).apply;
  });

  if (evaluators.length && user) {
    const hasPermission = evaluators.find(role => {
      const evaluate = role as RoleEvaluator;
      return evaluate(user, organization);
    });

    if (!hasPermission) {
      return false;
    }
  }
  if (roles && userRoles && userRoles.length) {
    const allRoles: Array<Roles | RoleEvaluator> = superAdmin ? [Roles.SUPER_ADMINISTRATOR] : [];
    allRoles.push(...roles);

    const hasRole = (role: Role): boolean =>
      !!allRoles.find(userRole => {
        return [role.name, Roles.ALL].includes(userRole as string);
      });

    return !!userRoles.find(hasRole);
  } else {
    return true;
  }
};

export default useRoleManager;
