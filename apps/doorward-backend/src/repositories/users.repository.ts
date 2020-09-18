import UserEntity from '@doorward/common/entities/user.entity';
import { EntityRepository } from 'typeorm';
import OrganizationBasedRepository from '../utils/organization.based.repository';

@EntityRepository(UserEntity)
export class UsersRepository extends OrganizationBasedRepository<UserEntity> {
  async userExistsByUsername(username: string) {
    return await this.createQueryBuilder('user')
      .where('LOWER(username) = LOWER(:username)', {
        username: username.trim(),
      })
      .getOne();
  }
}
