import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { MeetingStatus } from '@doorward/common/types/meeting';
import UserModel from '@doorward/common/models/user.model';
import MeetingRoomModel from '@doorward/common/models/meeting.room.model';

export default interface MeetingModel extends BaseOrganizationModel {
  sessionId: string;
  numParticipants: number;
  status: MeetingStatus;
  host: UserModel;
  meetingRoom: MeetingRoomModel;
}
