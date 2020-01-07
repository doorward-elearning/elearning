import { Model } from '@edudoor/common/models/Model';
import { Answer } from '@edudoor/common/models/Answer';

export interface Question extends Model {
  question: any;
  points: number;
  answers: Array<Answer>;
}
