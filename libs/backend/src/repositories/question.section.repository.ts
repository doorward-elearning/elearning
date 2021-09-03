import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';

export default class QuestionSectionRepository extends MultiOrganizationRepository<QuestionSectionEntity> {
  getEntity(): ObjectType<QuestionSectionEntity> {
    return QuestionSectionEntity;
  }
}
