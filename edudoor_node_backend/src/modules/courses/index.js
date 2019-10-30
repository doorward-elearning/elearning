import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import { validateCreateCourse } from './validate';
import CourseController from './CourseController';

const Router = new MRouter('/courses', Authorization.authenticate);

Router.post('/', validateCreateCourse, CourseController.createCourse);

Router.get('/', CourseController.getCourses);

export default Router;
