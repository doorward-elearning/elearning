import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ObjectType } from 'typeorm';

export default class AssessmentRepository<
  T extends AssessmentEntity = AssessmentEntity
> extends ModuleItemsRepository<T> {
  getEntity(): ObjectType<T> {
    return AssessmentEntity;
  }
}
