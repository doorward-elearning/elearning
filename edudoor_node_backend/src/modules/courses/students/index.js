import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import StudentCourseController from './StudentCourseController';
import { validateCreateUser } from '../../users/validate';
import { validateCourseExists } from '../validate';

const Router = new MRouter('/', Authorization.authenticate, validateCourseExists());

Router.get('/', StudentCourseController.getStudents);

Router.post('/', validateCreateUser(), StudentCourseController.createStudent);

Router.get('/not-registered', StudentCourseController.getStudentsNotRegistered);

export default Router;
