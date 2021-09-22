import { Connection } from 'typeorm';
import createOrganizationsDbConnection from '@doorward/backend/utils/createOrganizationsDbConnection';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import connectDatabase from '@doorward/backend/database/connectDatabase';

const multiOrganizationSetup = (
  setupFunction: (connection: Connection, organization: OrganizationEntity, orgConnection: Connection) => Promise<any>
) => {
  return async (entities: Array<any>, ormConfig: any, orgOrmConfig: any) => {
    const organizationsConnection = await createOrganizationsDbConnection(orgOrmConfig);

    const organizations = await organizationsConnection.createEntityManager().find(OrganizationEntity);

    await Promise.all(
      organizations.map(async (organization) => {
        const connection = await connectDatabase(entities, {
          ...ormConfig,
          name: organization.name,
          database: organization.databaseName,
        });

        await setupFunction(connection, organization, organizationsConnection);
      })
    );
  };
};

export default multiOrganizationSetup;
