import { EntityRepository } from 'typeorm';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import OrganizationBasedRepository from './organization.based.repository';

@EntityRepository(AnswerEntity)
export default class AnswerRepository extends OrganizationBasedRepository<AnswerEntity> {}
