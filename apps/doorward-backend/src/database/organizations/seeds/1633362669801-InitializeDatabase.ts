import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export class InitializeDatabase1633362669801 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    await entityManager
      .createQueryBuilder()
      .insert()
      .into(OrganizationEntity)
      .values([
        {
          id: process.env.DEFAULT_ORGANIZATION_ID,
          name: process.env.DEFAULT_ORGANIZATION_NAME,
          displayName: process.env.DEFAULT_ORGANIZATION_DISPLAY_NAME,
          hosts: process.env.DEFAULT_ORGANIZATION_HOST,
          databaseName: process.env.DEFAULT_ORGANIZATION_DATABASE_NAME,
        },
      ])
      .onConflict(`("id") DO NOTHING`)
      .execute();
  }

  async rollback(entityManager: EntityManager): Promise<any> {
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(OrganizationEntity)
      .where({
        id: process.env.DEFAULT_ORGANIZATION_ID,
      })
      .execute();
  }
}
