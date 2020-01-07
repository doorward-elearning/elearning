import { Model } from '@edudoor/common/models/Model';

export interface Meeting extends Model {
  id: string;
  sessionId: string;
  numParticipants: number;
  status: string;
  endedAt: string;
}
