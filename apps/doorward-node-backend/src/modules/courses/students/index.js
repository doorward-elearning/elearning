import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import StudentCourseController from './StudentCourseController';
import { validateCreateUser } from '../../users/validate';
import { validateCourseExists } from '../validate';

const Router = new MRouter('/:courseId/students', Authorization.authenticate, validateCourseExists());

Router.get('/', StudentCourseController.getStudents);

Router.post('/', validateCreateUser(), StudentCourseController.createStudent);

Router.get('/not-registered', StudentCourseController.getStudentsNotRegistered);

Router.post('/register', StudentCourseController.addStudent);

Router.delete('/:studentId', StudentCourseController.unEnrollStudent);

export default Router;
