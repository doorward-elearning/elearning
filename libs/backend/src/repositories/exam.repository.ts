import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import { ExamEntity } from '@doorward/common/entities/exam.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ExamEntity)
export default class ExamRepository extends AssessmentRepository<ExamEntity> {}
