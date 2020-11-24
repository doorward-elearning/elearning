import BaseModel from '@doorward/common/models/base.model';
import MeetingRoomModel from '@doorward/common/models/meeting.room.model';
import SchoolModel from '@doorward/common/models/school.model';

export default interface ClassroomModel extends BaseModel {
  name: string;
  school: SchoolModel;
  meetingRoom: MeetingRoomModel;
}
