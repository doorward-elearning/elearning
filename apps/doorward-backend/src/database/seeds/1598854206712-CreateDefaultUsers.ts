import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserEntity from '../entities/user.entity';
import { UserStatus } from '@doorward/common/types/users';
import OrganizationEntity from '../entities/organization.entity';
import RoleEntity from '../entities/role.entity';
import { Roles } from '@doorward/common/types/roles';

export class CreateDefaultUsers1598854206712 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    const password = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASSWORD,
      +(process.env.BCRYPT_PASSWORD_SALT || process.env.BCRYPT_PASSWORD_SALT)
    );

    const fullName = process.env.ORGANIZATION_DEFAULT_ADMIN_FULLNAME.trim().split(/\s+/);
    const organization = await entityManager
      .createQueryBuilder(OrganizationEntity, 'organization')
      .where('organization.id  = :id', { id: process.env.DEFAULT_ORGANIZATION_ID })
      .getOne();

    const role = await entityManager
      .createQueryBuilder(RoleEntity, 'role')
      .where('role.id = :name', { name: Roles.SUPER_ADMINISTRATOR })
      .getOne();

    await entityManager
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          id: process.env.DEFAULT_ADMIN_ID,
          username: process.env.DEFAULT_ADMIN_USERNAME,
          password,
          status: UserStatus.ACTIVE,
          email: process.env.DEFAULT_ADMIN_EMAIL,
          organization,
          firstName: fullName[0],
          lastName: fullName[1],
          role,
        },
      ])
      .execute();
  }

  async rollback(entityManager: EntityManager): Promise<any> {
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where({ id: process.env.DEFAULT_ADMIN_ID })
      .execute();
  }
}
