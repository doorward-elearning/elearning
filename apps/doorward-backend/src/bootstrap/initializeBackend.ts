import { multiOrganizationRolesSetup } from './organizationRolesSetup';
import configureLang from '@doorward/common/lang/backend.config';
import { createDefaultOrganization, multiOrganizationConfigSetup } from './organizationSetup';
import { multiOrganizationPrivilegesSetup } from './privilegesSetup';

const initializeBackend = async <T>(entities: Array<T>, ormConfig: any, organizationOrmConfig: any) => {
  await createDefaultOrganization(organizationOrmConfig);

  await multiOrganizationConfigSetup(entities, ormConfig, organizationOrmConfig);
  await multiOrganizationPrivilegesSetup(entities, ormConfig, organizationOrmConfig);
  await multiOrganizationRolesSetup(entities, ormConfig, organizationOrmConfig);

  await configureLang();
};

export default initializeBackend;
