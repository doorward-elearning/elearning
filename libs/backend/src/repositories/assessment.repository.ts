import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';

export default abstract class AssessmentRepository<
  T extends AssessmentEntity = AssessmentEntity
> extends ModuleItemsRepository<T> {}
