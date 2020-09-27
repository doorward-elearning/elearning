import { RoleEvaluator, Roles } from '../components/RolesManager';
import UserEntity from '@doorward/common/entities/user.entity';

const useRoleManager = (roles?: Array<Roles | RoleEvaluator>, superAdmin = true, user?: UserEntity): boolean => {
  return true;
};

export default useRoleManager;
