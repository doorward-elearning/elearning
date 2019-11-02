import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import modules from './modules';
import students from './students';
import { validateCourseExists, validateCreateCourse } from './validate';
import CourseController from './CourseController';

const Router = new MRouter('/courses', Authorization.authenticate);

Router.post('', validateCreateCourse, CourseController.createCourse);

Router.get('', CourseController.getCourses);

Router.get('/:courseId', validateCourseExists(), CourseController.getCourse);

Router.use('/:courseId/modules', modules);

Router.use('/:courseId/students', students);

export default Router;