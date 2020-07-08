import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import { validateCreateOrganization, validateOrganizationExists } from './validate';
import OrganizationController from './OrganizationController';
const roles = require('../../utils/roles');

const Router = new MRouter(
  '/organizations',
  Authorization.authenticate,
  Authorization.checkRoles(roles.SUPER_ADMINISTRATOR)
);

Router.exclude(Authorization.authenticate, Authorization.checkRoles(roles.SUPER_ADMINISTRATOR)).get(
  '/current',
  OrganizationController.getCurrentOrganization
);

Router.post('', validateCreateOrganization, OrganizationController.create);

Router.get('', OrganizationController.getAll);

Router.put('/:organizationId', validateOrganizationExists, OrganizationController.updateOrganization);

Router.get('/:organizationId', validateOrganizationExists, OrganizationController.getOrganization);

export default Router;
