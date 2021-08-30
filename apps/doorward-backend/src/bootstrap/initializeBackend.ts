import rolesSetup from './roleSetup';
import organizationSetup from './organizationSetup';
import configureLang from '@doorward/common/lang/backend.config';

const initializeBackend = async <T>(entities: Array<T>, ormConfig: any) => {
  await rolesSetup(entities, ormConfig);
  await organizationSetup(entities, ormConfig);
  await configureLang();
};

export default initializeBackend;
