import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ObjectType } from 'typeorm';
import { PageEntity } from '@doorward/common/entities/page.entity';

export default class PageRepository extends ModuleItemsRepository<PageEntity> {
  getEntity(): ObjectType<PageEntity> {
    return PageEntity;
  }
}
