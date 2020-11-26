import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { ChildEntity } from 'typeorm';

@ChildEntity(ModuleItemType.ASSESSMENT)
export class ExamEntity extends AssessmentEntity {
  assessmentType = AssessmentTypes.EXAM;
}
