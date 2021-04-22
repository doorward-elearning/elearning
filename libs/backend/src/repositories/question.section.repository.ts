import OrganizationBasedRepository from '@doorward/backend/repositories/organization.based.repository';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(QuestionSectionEntity)
export default class QuestionSectionRepository extends OrganizationBasedRepository<QuestionSectionEntity> {}
