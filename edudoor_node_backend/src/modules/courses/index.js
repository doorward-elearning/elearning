import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import modules from './modules';
import students from './students';
import { validateCourseExists, validateCreateCourse, validateUpdateCourse } from './validate';
import CourseController from './CourseController';

const Router = new MRouter('/courses', Authorization.authenticate);

Router.post('', validateCreateCourse, CourseController.createCourse);

Router.put('/:courseId', validateUpdateCourse, CourseController.updateCourse);

Router.get('', CourseController.getCourses);

Router.get('/:courseId', validateCourseExists(), CourseController.getCourse);

Router.use('/', modules);

Router.use('/', students);

export default Router;
