import connectDatabase from '@doorward/backend/database/connectDatabase';
import organizationsEntities from '@doorward/backend/database/organizations.entities';

export const ORGANIZATIONS_CONNECTION_NAME = 'organizations';

const createOrganizationsDbConnection = async (ormConfig: any) => {
  return await connectDatabase(organizationsEntities, {
    ...ormConfig,
    database: process.env.ORGANIZATION_DATABASE,
    migrationsRun: false,
    name: ORGANIZATIONS_CONNECTION_NAME,
  });
};

export default createOrganizationsDbConnection;
