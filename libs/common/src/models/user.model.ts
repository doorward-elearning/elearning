import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { Gender } from '@doorward/common/types/genders';
import PasswordsResetsModel from '@doorward/common/models/passwords.resets.model';
import GroupMemberModel from '@doorward/common/models/group.member.model';
import MeetingModel from '@doorward/common/models/meeting.model';
import RoleModel from '@doorward/common/models/role.model';
import MeetingRoomMemberModel from '@doorward/common/models/meeting.room.member.model';

export default interface UserModel extends BaseOrganizationModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  zipCode: string;
  country: string;
  city: string;
  gender: Gender;
  status: string;
  role: RoleModel;
  meetingRooms: Array<MeetingRoomMemberModel>;
  meetings: Array<MeetingModel>;
  groups: Array<GroupMemberModel>;
  passwordResets: Array<PasswordsResetsModel>;
  createdBy: UserModel;
}
