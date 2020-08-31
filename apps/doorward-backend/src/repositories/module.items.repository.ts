import OrganizationBasedRepository from '../utils/organization.based.repository';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ModuleItemEntity)
export default class ModuleItemsRepository extends OrganizationBasedRepository<ModuleItemEntity> {}
