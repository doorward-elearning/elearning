import { RoleEvaluator } from '../components/RolesManager';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';

const useRoleManager = (roles?: Array<Roles | RoleEvaluator>, superAdmin = true, user?: UserEntity): boolean => {
  return true;
};

export default useRoleManager;
