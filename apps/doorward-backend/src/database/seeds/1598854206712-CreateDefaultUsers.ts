import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserEntity from '@doorward/common/entities/user.entity';
import { UserStatus } from '@doorward/common/types/users';
import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';

export class CreateDefaultUsers1598854206712 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    const tableExists = await entityManager.connection.query(
      `SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SequelizeData'`
    );
    if (tableExists.length) {
      const result = await entityManager.connection.query(
        `SELECT * FROM "SequelizeData" WHERE name = '20191029143535-create-default-users.js'`
      );
      if (result?.length) {
        return;
      }
    }
    const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, +process.env.BCRYPT_PASSWORD_SALT);


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
          id: process.env.DEFAULT_ADMIN_ID+"",
          username: process.env.DEFAULT_ADMIN_USERNAME,
          password,
          status: UserStatus.ACTIVE,
          email: process.env.DEFAULT_ADMIN_EMAIL,
          firstName: process.env.DEFAULT_ADMIN_FIRSTNAME,
          lastName: process.env.DEFAULT_ADMIN_LASTNAME,
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
