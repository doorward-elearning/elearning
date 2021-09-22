import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import { ExamEntity } from '@doorward/common/entities/exam.entity';
import { ObjectType } from 'typeorm';

export default class ExamRepository extends AssessmentRepository<ExamEntity> {
  getEntity(): ObjectType<ExamEntity> {
    return ExamEntity;
  }
}
