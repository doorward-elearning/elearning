import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ObjectType } from 'typeorm';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

export default class AssignmentRepository extends ModuleItemsRepository<AssignmentEntity> {
  getEntity(): ObjectType<AssignmentEntity> {
    return AssignmentEntity;
  }
}
