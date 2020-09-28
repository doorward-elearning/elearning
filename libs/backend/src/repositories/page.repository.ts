import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { EntityRepository } from 'typeorm';
import { PageEntity } from '@doorward/common/entities/page.entity';

@EntityRepository(PageEntity)
export default class PageRepository extends ModuleItemsRepository<PageEntity> {}
