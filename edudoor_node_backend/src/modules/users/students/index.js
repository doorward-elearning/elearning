import MRouter from '../../../utils/router';
import { validateCreateUser } from '../validate';
import StudentController from './StudentController';

const Router = new MRouter('');

Router.post('', validateCreateUser, StudentController.createStudent);

export default Router;
