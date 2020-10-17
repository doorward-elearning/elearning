import { EntityRepository } from 'typeorm';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';

@EntityRepository(QuizEntity)
export default class QuizRepository extends AssessmentRepository<QuizEntity> {}
