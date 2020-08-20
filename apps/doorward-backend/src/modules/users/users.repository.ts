import { ModelRepository } from '../../utils/model.repository';
import UserEntity from '../../database/entities/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UsersRepository extends ModelRepository<UserEntity> {}
