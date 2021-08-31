import UserEntity from '@doorward/common/entities/user.entity';
import { EntityRepository } from 'typeorm';
import OrganizationBasedRepository from './organization.based.repository';
import { Roles } from '@doorward/common/types/roles';
import { Injectable, Req, Scope } from '@nestjs/common';

@EntityRepository(UserEntity)
@Injectable({ scope: Scope.REQUEST })
export class UsersRepository extends OrganizationBasedRepository<UserEntity> {
  /**
   *
   * @param username
   */
  async userExistsByUsername(username: string, @Req() organization?: any) {
    console.log(organization, '--------------------------');
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
    const result = await this.createQueryBuilder('user')
      .innerJoin('user.role', 'role')
      .where('role.name = :role', { role })
      .getMany();

    return result;
  }
}
