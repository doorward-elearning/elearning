import OrganizationBasedRepository from '@doorward/backend/repositories/organization.based.repository';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(AssessmentSubmissionEntity)
export default class AssessmentSubmissionRepository extends OrganizationBasedRepository<AssessmentSubmissionEntity> {}
