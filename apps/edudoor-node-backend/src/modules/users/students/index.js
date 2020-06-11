import MRouter from '../../../utils/router';
import { validateCreateUser } from '../validate';
import StudentController from './StudentController';
import Authorization from '../../../middleware/Authorization';
import { validateStudentExists } from './validate';

const Router = new MRouter('/', Authorization.authenticate);

Router.post('/', validateCreateUser(), StudentController.createStudent);

Router.put('/:studentId', validateStudentExists, req => validateCreateUser(req.body), StudentController.updateStudent);

Router.get('/', StudentController.getAllStudents);

Router.post('/:studentId/changePassword', validateStudentExists, StudentController.updateStudentPassword);

Router.get('/:studentId', validateStudentExists, StudentController.getStudent);

export default Router;
