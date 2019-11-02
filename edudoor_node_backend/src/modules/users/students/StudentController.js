import * as roles from '../../../utils/roles';
import UserController from '../UserController';

class StudentController {
  static async createStudent(req) {
    const student = await UserController.createUser(req, roles.STUDENT);

    return [200, { student }, 'Student has been added successfully'];
  }
}

export default StudentController;
