import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { MeetingRoomTypes } from '@doorward/common/types/meeting';
import MeetingModel from '@doorward/common/models/meeting.model';
import CourseModel from '@doorward/common/models/course.model';
import MeetingRoomMemberModel from '@doorward/common/models/meeting.room.member.model';

export default interface MeetingRoomModel extends BaseOrganizationModel {
  title: string;
  type: MeetingRoomTypes;
  members: Array<MeetingRoomMemberModel>;
  meetings: Array<MeetingModel>;
  course: CourseModel;
  currentMeeting: MeetingModel;
}
