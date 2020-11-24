import BaseModel from '@doorward/common/models/base.model';
import { Roles } from '@doorward/common/types/roles';
import UserModel from '@doorward/common/models/user.model';
import PrivilegeModel from '@doorward/common/models/privilege.model';

export default interface RoleModel extends BaseModel {
  name: Roles;
  displayName: string;
  description: string;
  users: Array<UserModel>;
  privileges: Array<PrivilegeModel>;
}
