import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import UserModel from '@doorward/common/models/user.model';
import GroupMemberModel from '@doorward/common/models/group.member.model';

export default interface GroupModel extends BaseOrganizationModel {
  name: string;
  type: string;
  author: UserModel;
  members: Array<GroupMemberModel>;
}
