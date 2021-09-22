import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ObjectType } from 'typeorm';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';

export default class ModuleVideoRepository extends ModuleItemsRepository<ModuleVideoEntity> {
  getEntity(): ObjectType<ModuleVideoEntity> {
    return ModuleVideoEntity;
  }
}
