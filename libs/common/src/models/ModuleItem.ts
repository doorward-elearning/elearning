import { Model } from '@edudoor/common/models/Model';
import { Question } from '@edudoor/common/models/Question';
import { ModuleItemTypes } from '@edudoor/common/models/index';

export interface ModuleItem extends Model {
  title: string;
  content: any;
  order: number;
  type: ModuleItemTypes;
  questions: Array<Question>;
}
