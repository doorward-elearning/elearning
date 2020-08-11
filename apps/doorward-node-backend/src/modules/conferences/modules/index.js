import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateConferenceExists } from '../validate';
import ModulesController from './ModulesController';
import {
  validateConferenceModule,
  validateIsAssignment,
  validateModuleExists,
  validateModuleItem,
  validateModuleItemExists,
  validateUpdateModule,
} from './validate';
import Tools from '../../../utils/Tools';

const Router = new MRouter('/', Authorization.authenticate);

Router.get('/:conferenceId/modules', validateConferenceExists(), ModulesController.getConferenceModules);

Router.get('/:conferenceId/modules/items', Tools.useQuery('type'), ModulesController.getConferenceModuleItems);

Router.post('/:conferenceId/modules', validateConferenceModule, ModulesController.addConferenceModule);

Router.put('/modules/:moduleId', validateUpdateModule, ModulesController.updateConferenceModule);

Router.delete('/modules/:moduleId', validateModuleExists, ModulesController.deleteConferenceModule);

Router.get('/modules/:moduleId', validateModuleExists, ModulesController.getConferenceModule);

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
