import UserEntity from '@doorward/common/entities/user.entity';
import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import { Roles } from '@doorward/common/types/roles';

export class UsersRepository extends MultiOrganizationRepository<UserEntity> {
  /**
   *
   * @param username
   */
  async userExistsByUsername(username: string) {
    return await this.createQueryBuilder('user')
      .where('LOWER(username) = LOWER(:username)', {
        username: username.trim(),
      })
      .getOne();
  }

  /**
   *
   * @param userId
   */
  async userExistsById(userId: string) {
    return this.findOne(userId);
  }

  /**
   *
   * @param userId
   * @param role
   */
  async userExistsByRole(userId: string, role: Roles) {
    return await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.id = :userId', { userId })
      .andWhere('role.name = :role', { role })
      .getOne();
  }

  /**
   *
   * @param role
   */
  async getUsersByRole(role: Roles) {
    return await this.createQueryBuilder('user')
      .innerJoin('user.role', 'role')
      .where('role.name = :role', { role })
      .getMany();
  }

  getEntity(): ObjectType<UserEntity> {
    return UserEntity;
  }
}
