import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { GroupRoles } from '@doorward/common/types/groups';
import UserModel from '@doorward/common/models/user.model';
import GroupModel from '@doorward/common/models/group.model';

export default interface GroupMemberModel extends BaseOrganizationModel {
  role: GroupRoles;
  member: UserModel;
  group: GroupModel;
  referee: UserModel;
}
