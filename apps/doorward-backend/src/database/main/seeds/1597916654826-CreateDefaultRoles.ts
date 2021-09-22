import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';

export class CreateDefaultRoles1597916654826 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
  }

  async rollback(entityManager: EntityManager): Promise<any> {
    return entityManager
      .createQueryBuilder(RoleEntity, 'role')
      .delete()
      .from(RoleEntity, 'role')
      .where('name IN (:...names)', {
        names: [Roles.STUDENT, Roles.TEACHER, Roles.SUPER_ADMINISTRATOR],
      })
      .execute();
  }
}
