import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';
import Tools from '@doorward/common/utils/Tools';

export class CreateDefaultRoles1597916654826 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    const tableExists = await entityManager.connection.query(
      `SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SequelizeData'`
    );

    if (tableExists.length) {
      const result = await entityManager.connection.query(
        `SELECT * FROM "SequelizeData" WHERE name = '20191029143652-create-default-roles.js'`
      );
      if (result && result.length) {
        return;
      }
    }
    return entityManager
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([
        {
          id: Tools.generateId(),
          name: Roles.SUPER_ADMINISTRATOR,
          displayName: 'Super Administrator',
          description: 'The system administrator who is responsible for all functions in the application',
        },
        {
          id: Tools.generateId(),
          name: Roles.TEACHER,
          displayName: 'Teacher',
          description: 'A user who can manage courses, modules and other resources',
        },
        {
          id: Tools.generateId(),
          name: Roles.STUDENT,
          displayName: 'Student',
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
      .where('name IN (:...names)', {
        names: [Roles.STUDENT, Roles.TEACHER, Roles.SUPER_ADMINISTRATOR],
      })
      .execute();
  }
}
