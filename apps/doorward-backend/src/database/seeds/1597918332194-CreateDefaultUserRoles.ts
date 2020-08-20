import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import UserRolesEntity from '../entities/user.roles.entity';
import Tools from '@doorward/common/utils/Tools';
import RoleEntity from '../entities/role.entity';
import { Roles } from '@doorward/common/types/roles';
import UserEntity from '../entities/user.entity';

const userRoleId = 'XhJSfeHVDh-rne7_zF_y8';

export class CreateDefaultUserRoles1597918332194 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    const organization = await entityManager
      .createQueryBuilder(OrganizationEntity, 'organization')
      .where('organization.id  = :id', { id: process.env.DEFAULT_ORGANIZATION_ID })
      .getOne();

    const role = await entityManager
      .createQueryBuilder(RoleEntity, 'role')
      .where('role.name = :name AND role."organizationId" = :organizationId', {
        name: Roles.SUPER_ADMINISTRATOR,
        organizationId: process.env.DEFAULT_ORGANIZATION_ID,
      })
      .getOne();

    const user = await entityManager
      .createQueryBuilder(UserEntity, 'user')
      .where('user.id = :id', {
        id: process.env.DEFAULT_ADMIN_ID,
      })
      .getOne();

    await entityManager
      .createQueryBuilder()
      .insert()
      .into(UserRolesEntity)
      .values([
        {
          id: userRoleId,
          role,
          user,
          organization,
        },
      ])
      .execute();
  }

  async rollback(entityManager: EntityManager): Promise<any> {
    await entityManager
      .createQueryBuilder(UserRolesEntity, 'userRole')
      .delete()
      .where('id = :id', { id: userRoleId })
      .execute();
  }
}
