import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCourseExists } from '../validate';
import ModulesController from './ModulesController';
import {
  validateCourseModule,
  validateIsAssignment,
  validateModuleExists,
  validateModuleItem,
  validateModuleItemExists,
  validateUpdateModule,
} from './validate';
import Tools from '../../../utils/Tools';

const Router = new MRouter('/', Authorization.authenticate);

Router.get('/:courseId/modules', validateCourseExists(), ModulesController.getCourseModules);

Router.get('/:courseId/modules/items', Tools.useQuery('type'), ModulesController.getCourseModuleItems);

Router.post('/:courseId/modules', validateCourseModule, ModulesController.addCourseModule);

Router.put('/modules/:moduleId', validateUpdateModule, ModulesController.updateCourseModule);

Router.delete('/modules/:moduleId', validateModuleExists, ModulesController.deleteCourseModule);

Router.get('/modules/:moduleId', validateModuleExists, ModulesController.getCourseModule);

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
