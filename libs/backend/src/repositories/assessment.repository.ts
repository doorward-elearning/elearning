import { EntityRepository } from 'typeorm';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';

@EntityRepository(AssessmentEntity)
export default class AssessmentRepository<T extends AssessmentEntity> extends ModuleItemsRepository<T> {}
