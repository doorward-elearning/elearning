import BaseModel from '@doorward/common/models/base.model';
import RoleModel from '@doorward/common/models/role.model';

export default interface PrivilegeModel extends BaseModel {
  name: string;
  description: string;
  roles: RoleModel[];
}
