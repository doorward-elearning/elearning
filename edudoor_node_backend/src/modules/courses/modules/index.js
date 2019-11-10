import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCourseExists } from '../validate';
import ModulesController from './ModulesController';
import { validateCourseModule, validateModuleExists, validateModuleItem, validateUpdateModule } from './validate';
import Tools from '../../../utils/Tools';

const Router = new MRouter('/', Authorization.authenticate);

Router.get('/', validateCourseExists(), ModulesController.getCourseModules);

Router.post('/', validateCourseModule, ModulesController.addCourseModule);

Router.put('/:moduleId', validateUpdateModule, ModulesController.updateCourseModule);

Router.get('/:moduleId', validateModuleExists, ModulesController.getCourseModule);

const ItemRouter = new MRouter('/items', Authorization.authenticate, validateModuleExists);

ItemRouter.post('/', validateModuleItem, ModulesController.createModuleItem);

ItemRouter.get('/', Tools.useQuery('type'), ModulesController.getAllModuleItems);

Router.use('/:moduleId', ItemRouter);

export default Router;
