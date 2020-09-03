import { Repository } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export default class ModelRepository<Entity extends BaseEntity | OrganizationEntity> extends Repository<Entity> {}
