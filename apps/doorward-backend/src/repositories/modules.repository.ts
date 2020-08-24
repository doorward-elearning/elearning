import OrganizationBasedRepository from '../utils/organization.based.repository';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ModuleEntity)
export default class ModulesRepository extends OrganizationBasedRepository<ModuleEntity> {}
