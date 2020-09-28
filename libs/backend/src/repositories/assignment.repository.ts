import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { EntityRepository } from 'typeorm';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

@EntityRepository(AssignmentEntity)
export default class AssignmentRepository extends ModuleItemsRepository<AssignmentEntity> {}
