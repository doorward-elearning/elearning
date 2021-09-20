import rolesSetup from './privilegesSetup';
import organizationRolesSetup from './organizationRolesSetup';
import configureLang from '@doorward/common/lang/backend.config';
import organizationSetup from './organizationSetup';

const initializeBackend = async <T>(entities: Array<T>, ormConfig: any, organizationOrmConfig: any) => {
  await organizationSetup(organizationOrmConfig);
  await rolesSetup(entities, ormConfig, organizationOrmConfig);
  await organizationRolesSetup(entities, ormConfig, organizationOrmConfig);
  await configureLang();
};

export default initializeBackend;
