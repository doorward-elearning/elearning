import MRouter from '../../../utils/router';
import { validateCreateUser } from '../validate';
import StudentController from './StudentController';
import Authorization from '../../../middleware/Authorization';

const Router = new MRouter('/', Authorization.authenticate);

Router.post('/', validateCreateUser, StudentController.createStudent);

Router.get('/', StudentController.getAllStudents);

export default Router;
