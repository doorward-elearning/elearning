import { Model } from '@edudoor/common/models/Model';
import { MeetingRoom } from './MeetingRoom';

export interface Meeting extends Model {
  id: string;
  sessionId: string;
  numParticipants: number;
  status: string;
  endedAt: string;
  meetingRoom: MeetingRoom;
}
