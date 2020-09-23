import ModelRepository from './model.repository';
import PasswordsResetsEntity from '@doorward/common/entities/passwords.resets.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(PasswordsResetsEntity)
export default class PasswordResetsRepository extends ModelRepository<PasswordsResetsEntity> {}
