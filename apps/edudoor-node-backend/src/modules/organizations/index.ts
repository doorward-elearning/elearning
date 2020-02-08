import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import { validateCreateOrganization } from './validate';
import OrganizationController from './OrganizationController';
const roles = require('../../utils/roles');

const Router = new MRouter(
  '/organizations',
  Authorization.authenticate,
  Authorization.checkRoles(roles.SUPER_ADMINISTRATOR)
);

Router.post('', validateCreateOrganization, OrganizationController.create);

Router.get('', OrganizationController.getAll);


export default Router;
