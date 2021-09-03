import AnswerEntity from '@doorward/common/entities/answer.entity';
import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class AnswerRepository extends MultiOrganizationRepository<AnswerEntity> {
  getEntity(): ObjectType<AnswerEntity> {
    return AnswerEntity;
  }
}
