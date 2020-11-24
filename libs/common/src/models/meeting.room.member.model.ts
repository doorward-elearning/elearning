import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import MeetingRoomModel from '@doorward/common/models/meeting.room.model';
import UserModel from '@doorward/common/models/user.model';
import { MeetingRoles } from '@doorward/common/types/openvidu';

export default interface MeetingRoomMemberModel extends BaseOrganizationModel {
  meetingRoom: MeetingRoomModel;
  participant: UserModel;
  role: MeetingRoles;
}
