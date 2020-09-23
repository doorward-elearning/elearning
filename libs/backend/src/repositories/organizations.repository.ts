import { EntityRepository } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import ModelRepository from './model.repository';

@EntityRepository(OrganizationEntity)
export default class OrganizationsRepository extends ModelRepository<OrganizationEntity> {}
