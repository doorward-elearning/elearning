import { Repository } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';

export default class ModelRepository<Entity extends BaseEntity> extends Repository<Entity> {}
