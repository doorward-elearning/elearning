import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCourseExists } from '../validate';
import ModulesController from './ModulesController';
import { validateCourseModule, validateUpdateModule } from './validate';

const Router = new MRouter('', Authorization.authenticate);

Router.get('', validateCourseExists(), ModulesController.getCourseModules);

Router.post('', validateCourseModule, ModulesController.addCourseModule);

Router.put('/:moduleId', validateUpdateModule, ModulesController.updateCourseModule);

export default Router;
