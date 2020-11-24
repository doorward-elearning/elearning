import { AssessmentOptions } from '@doorward/common/types/assessments';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import QuestionModel from '@doorward/common/models/question.model';
import ModuleItemModel from '@doorward/common/models/module.item.model';

export default interface AssessmentModel extends ModuleItemModel {
  options: AssessmentOptions;
  instructions: string;
  assessmentType: AssessmentTypes;
  questions: Array<QuestionModel>;
}
