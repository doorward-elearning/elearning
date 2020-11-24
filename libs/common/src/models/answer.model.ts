import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import QuestionModel from '@doorward/common/models/question.model';

export default interface AnswerModel extends BaseOrganizationModel {
  answer: string;
  description: string;
  correct: boolean;
  question?: QuestionModel;
}
