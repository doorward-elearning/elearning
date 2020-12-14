import { EntityRepository } from 'typeorm';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';

@EntityRepository(ModuleVideoEntity)
export default class ModuleVideoRepository extends ModuleItemsRepository<ModuleVideoEntity> {}
