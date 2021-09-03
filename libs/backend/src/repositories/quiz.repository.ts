import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import { ObjectType } from 'typeorm';

export default class QuizRepository extends AssessmentRepository<QuizEntity> {
  getEntity(): ObjectType<QuizEntity> {
    return QuizEntity;
  }
}
