import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import AssessmentModel from '@doorward/common/models/assessment.model';
import { AnswerTypes } from '@doorward/common/types/exam';
import AnswerModel from '@doorward/common/models/answer.model';

export default interface QuestionModel extends BaseOrganizationModel {
  question: string;
  points: number;
  assessment: AssessmentModel;
  type: AnswerTypes;
  answers: Array<AnswerModel>;
}
