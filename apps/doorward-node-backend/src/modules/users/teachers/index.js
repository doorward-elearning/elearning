import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCreateUser } from '../validate';
import TeacherController from './TeacherController';

const Router = new MRouter('/', Authorization.authenticate);

Router.post('/', validateCreateUser(), TeacherController.createTeacher);

Router.exclude(Authorization.authenticate).post('/free-trial', validateCreateUser(), TeacherController.createTeacher);

Router.get('/', TeacherController.getAllTeachers);

export default Router;
