import QuestionEntity from '@doorward/common/entities/question.entity';
import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class QuestionRepository extends MultiOrganizationRepository<QuestionEntity> {
  getEntity(): ObjectType<QuestionEntity> {
    return QuestionEntity;
  }
}
