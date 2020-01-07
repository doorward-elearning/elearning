import { Model } from '@edudoor/common/models/Model';

export interface Answer extends Model {
  answer: string;
  description: any;
  correct: boolean;
}
