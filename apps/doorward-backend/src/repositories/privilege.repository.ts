import { EntityRepository } from 'typeorm';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import ModelRepository from '../utils/model.repository';

@EntityRepository(PrivilegeEntity)
export default class PrivilegeRepository extends ModelRepository<PrivilegeEntity> {}
