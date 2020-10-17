import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import { ChildEntity } from 'typeorm';

@ChildEntity(AssessmentTypes.EXAM)
export class ExamEntity extends AssessmentEntity {}
