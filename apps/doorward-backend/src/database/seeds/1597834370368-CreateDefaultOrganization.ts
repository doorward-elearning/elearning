import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export class CreateDefaultOrganization1597834370368 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
    const result = await entityManager.connection.query(
      `SELECT * FROM "SequelizeData" WHERE name = '20191029143016-create-default-organization.js'`
    );
    if (result && result.length) {
      return;
    }
    await entityManager
      .createQueryBuilder()
      .insert()
      .into(OrganizationEntity)
      .values([
        {
          id: process.env.DEFAULT_ORGANIZATION_ID,
          description:
            'The default organization for the application. A user from this organization can access all other organizations',
          name: process.env.DEFAULT_ORGANIZATION_NAME,
          icon: '',
          darkThemeIcon: '',
          link: 'https://doorward.tech',
        },
      ])
      .execute();
  }

  async rollback(entityManager: EntityManager): Promise<any> {
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(OrganizationEntity, 'organization')
      .where('id = :id', { id: process.env.DEFAULT_ORGANIZATION_ID })
      .execute();
  }
}
