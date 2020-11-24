import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { ChildEntity } from 'typeorm';
import ExamModel  from '@doorward/common/models/exam.model';

@ChildEntity(ModuleItemType.ASSESSMENT)
export class ExamEntity extends AssessmentEntity implements ExamModel {
  assessmentType = AssessmentTypes.EXAM;
}
