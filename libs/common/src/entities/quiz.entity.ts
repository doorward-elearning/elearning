import { ChildEntity } from 'typeorm';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import QuizModel  from '@doorward/common/models/quiz.model';

@ChildEntity(ModuleItemType.ASSESSMENT)
export class QuizEntity extends AssessmentEntity implements QuizModel {
  assessmentType = AssessmentTypes.QUIZ;
}
