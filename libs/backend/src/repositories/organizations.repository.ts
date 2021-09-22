import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OrganizationEntity)
export default class OrganizationsRepository extends Repository<OrganizationEntity> {}
