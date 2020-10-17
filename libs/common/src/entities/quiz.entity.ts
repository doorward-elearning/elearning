import { ChildEntity } from 'typeorm';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';

@ChildEntity(AssessmentTypes.QUIZ)
export class QuizEntity extends AssessmentEntity {}
