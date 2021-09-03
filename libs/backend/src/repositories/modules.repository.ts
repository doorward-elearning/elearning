import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import ModuleEntity from '@doorward/common/entities/module.entity';

export default class ModulesRepository extends MultiOrganizationRepository<ModuleEntity> {
  getEntity(): ObjectType<ModuleEntity> {
    return ModuleEntity;
  }
}
