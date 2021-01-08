import rolesSetup from './roleSetup';
import organizationSetup, { ORGANIZATION } from './organizationSetup';
import configureLang from '@doorward/common/lang/backend.config';

const initializeBackend = async <T>(entities: Array<T>, ormConfig: any) => {
  await rolesSetup(entities, ormConfig);
  await organizationSetup(entities, ormConfig);
  await configureLang(ORGANIZATION);
};

export default initializeBackend;
