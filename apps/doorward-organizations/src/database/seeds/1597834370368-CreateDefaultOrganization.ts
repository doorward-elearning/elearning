import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export class CreateDefaultOrganization1597834370368 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {
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
          displayName: process.env.DEFAULT_ORGANIZATION_DISPLAY_NAME,
          databaseName: process.env.DOORWARD_DATABASE,
          logo: '',
          darkThemeLogo: '',
          hosts: 'localhost:3000,doorward.local:3000',
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
