import UserEntity from '@doorward/common/entities/user.entity';
import { EntityRepository } from 'typeorm';
import OrganizationBasedRepository from '../utils/organization.based.repository';
import { Roles } from '@doorward/common/types/roles';

@EntityRepository(UserEntity)
export class UsersRepository extends OrganizationBasedRepository<UserEntity> {
  async userExistsByUsername(username: string) {
    return await this.createQueryBuilder('user')
      .where('LOWER(username) = LOWER(:username)', {
        username: username.trim(),
      })
      .getOne();
  }

  async userExistsById(userId: string) {
    return this.findOne(userId);
  }

  async userExistsByRole(userId: string, role: Roles) {
    return await this.createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .where('user.id = :userId', { userId })
      .andWhere('role.name = :role', { role })
      .getOne();
  }

  async getUsersByRole(role: Roles) {
    return await this.createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .andWhere('role.name = :role', { role })
      .getMany();
  }
}
