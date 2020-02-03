import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCourseExists } from '../validate';
import ModulesController from './ModulesController';
import { validateCourseModule, validateModuleExists, validateModuleItem, validateUpdateModule } from './validate';
import Tools from '../../../utils/Tools';

const Router = new MRouter('/', Authorization.authenticate);

Router.get('/:courseId/modules', validateCourseExists(), ModulesController.getCourseModules);

Router.post('/:courseId/modules', validateCourseModule, ModulesController.addCourseModule);

Router.put('/modules/:moduleId', validateUpdateModule, ModulesController.updateCourseModule);

Router.delete('/modules/:moduleId', validateModuleExists, ModulesController.deleteCourseModule);

Router.get('/modules/:moduleId', validateModuleExists, ModulesController.getCourseModule);

const ItemRouter = new MRouter('/items', Authorization.authenticate, validateModuleExists);

Router.use('/modules/:moduleId', ItemRouter);

ItemRouter.post('/', validateModuleItem, ModulesController.createModuleItem);

ItemRouter.get('/', Tools.useQuery('type'), ModulesController.getAllModuleItems);

export default Router;
