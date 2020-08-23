import UserEntity from '@doorward/common/entities/user.entity';
import { EntityRepository } from 'typeorm';
import OrganizationBasedRepository from '../../utils/organization.based.repository';

@EntityRepository(UserEntity)
export class UsersRepository extends OrganizationBasedRepository<UserEntity> {}
