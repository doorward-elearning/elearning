import { Model } from '@edudoor/common/models/Model';
import { Meeting } from '@edudoor/common/models/Meeting';

export interface MeetingRoom extends Model {
  title: string;
  currentMeeting: Meeting;
}
