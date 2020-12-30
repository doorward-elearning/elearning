import connectDatabase from '@doorward/backend/database/connectDatabase';
import rolesSetup from './roleSetup';
import organizationSetup, { ORGANIZATION } from './organizationSetup';
import configureLang from '@doorward/common/lang/backend.config';

const initializeBackend = async <T>(entities: Array<T>, ormConfig: any) => {
  const connectionManager = await connectDatabase(entities, ormConfig);

  await rolesSetup(connectionManager);
  await organizationSetup(connectionManager);
  await configureLang(ORGANIZATION);
};

export default initializeBackend;
