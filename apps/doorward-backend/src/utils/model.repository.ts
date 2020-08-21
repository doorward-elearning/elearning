import { Repository } from 'typeorm';
import BaseEntity from '../database/entities/base.entity';

export default class ModelRepository<Entity extends BaseEntity> extends Repository<Entity> {}
