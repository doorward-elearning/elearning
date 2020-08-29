import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';
import Tools from '@doorward/common/utils/Tools';

export class CreateDefaultRoles1597916654826 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    return entityManager
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([
        {
          id: Tools.generateId(),
          name: Roles.SUPER_ADMINISTRATOR,
          description: 'The system administrator who is responsible for all functions in the application',
        },
        {
          id: Tools.generateId(),
          name: Roles.TEACHER,
          description: 'A user who can manage courses, modules and other resources',
        },
        {
          id: Tools.generateId(),
          name: Roles.STUDENT,
          description: 'A learner in the system',
        },
      ])
      .execute();
  }

  async rollback(entityManager: EntityManager): Promise<any> {
    return entityManager
      .createQueryBuilder(RoleEntity, 'role')
      .delete()
      .from(RoleEntity, 'role')
      .where('"organizationId" = :organizationId AND name IN (:...names)', {
        organizationId: process.env.DEFAULT_ORGANIZATION_ID,
        names: [Roles.STUDENT, Roles.TEACHER, Roles.SUPER_ADMINISTRATOR],
      })
      .execute();
  }
}
