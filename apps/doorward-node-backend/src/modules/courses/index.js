import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import modules from './modules';
import members from './members';
import managers from './managers';
import { validateCourseExists, validateCreateCourse, validateUpdateCourse } from './validate';
import CourseController from './CourseController';

const Router = new MRouter('/courses', Authorization.authenticate);

Router.post('', validateCreateCourse, CourseController.createCourse);

Router.get('', CourseController.getCourses);

Router.put('/:courseId', validateUpdateCourse, CourseController.updateCourse);

Router.get('/:courseId', validateCourseExists(), CourseController.getCourse);

Router.delete('/:courseId', validateCourseExists(), CourseController.deleteCourse);

Router.put('/:courseId/modules', CourseController.updateCourseModules);

Router.post('/:courseId/room', validateCourseExists(), CourseController.startMeeting);

Router.post('/:courseId/room/join', validateCourseExists(), CourseController.joinMeeting);

Router.use('/', modules);

Router.use('/', members);

Router.use('/', managers);

export default Router;
