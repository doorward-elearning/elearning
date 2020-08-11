import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateForumExists } from '../validate';
import ModulesController from './ModulesController';
import {
  validateForumModule,
  validateIsAssignment,
  validateModuleExists,
  validateModuleItem,
  validateModuleItemExists,
  validateUpdateModule,
} from './validate';
import Tools from '../../../utils/Tools';

const Router = new MRouter('/', Authorization.authenticate);

Router.get('/:forumId/modules', validateForumExists(), ModulesController.getForumModules);

Router.get('/:forumId/modules/items', Tools.useQuery('type'), ModulesController.getForumModuleItems);

Router.post('/:forumId/modules', validateForumModule, ModulesController.addForumModule);

Router.put('/modules/:moduleId', validateUpdateModule, ModulesController.updateForumModule);

Router.delete('/modules/:moduleId', validateModuleExists, ModulesController.deleteForumModule);

Router.get('/modules/:moduleId', validateModuleExists, ModulesController.getForumModule);

const ItemRouter = new MRouter('/items', Authorization.authenticate, validateModuleExists);

Router.use('/modules/:moduleId', ItemRouter);

ItemRouter.post('/', validateModuleItem, ModulesController.createModuleItem);

ItemRouter.get('/', Tools.useQuery('type'), ModulesController.getAllModuleItems);

Router.get('/modules/items/:id', validateModuleItemExists, ModulesController.getModuleItem);

Router.post(
  '/modules/assignments/:id/submit',
  validateModuleItemExists,
  validateIsAssignment,
  ModulesController.submitAssignment
);

export default Router;
