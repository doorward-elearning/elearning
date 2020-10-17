import { ChildEntity } from 'typeorm';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';

@ChildEntity(ModuleItemType.ASSESSMENT)
export class QuizEntity extends AssessmentEntity {
  assessmentType = AssessmentTypes.QUIZ;
}
