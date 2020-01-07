import { Model } from '@edudoor/common/models/Model';

export interface MeetingRoom extends Model {
  id: string;
  sessionId: string;
  sessionName: string;
  status: string;
  token: string;
  user: string;
}
