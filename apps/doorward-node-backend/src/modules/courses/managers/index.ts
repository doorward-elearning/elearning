import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCourseExists } from '../validate';
import ManagerCourseController from './ManagerCourseController';
import { validateManagerExists } from './validate';

const Router = new MRouter('/:courseId/managers', Authorization.authenticate, validateCourseExists());

Router.get('/', ManagerCourseController.getManagers);

Router.post('/register', validateManagerExists(), ManagerCourseController.enrollCourseManager);

export default Router;
