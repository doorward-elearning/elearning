import { EntityRepository } from 'typeorm';
import QuestionEntity from '@doorward/common/entities/question.entity';
import OrganizationBasedRepository from '../utils/organization.based.repository';

@EntityRepository(QuestionEntity)
export default class QuestionRepository extends OrganizationBasedRepository<QuestionEntity> {}
