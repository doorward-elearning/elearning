import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';
import Emails from '../../../utils/Emails';
import OrganizationUtils from '../../../utils/OrganizationUtils';

class StudentController {
  static async createStudent(req) {
    const { user: student, resetToken } = await UserController.createUser(req, roles.STUDENT);

    // send mail to student
    Emails.studentCreated(student, resetToken, req.headers.origin);

    return [200, { student }, `${student.username} has been added successfully`];
  }

  static async getAllStudents() {
    const students = await UserController.findByRole(roles.STUDENT, {
      include: [
        {
          model: models.Course,
          as: 'courses',
          required: false,
        },
      ],
    });

    return [200, { students }];
  }
}

export default StudentController;
