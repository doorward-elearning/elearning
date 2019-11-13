import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';
import Emails from '../../../utils/Emails';

class StudentController {
  static async createStudent(req) {
    const { user } = req;
    const { user: student, resetToken } = await UserController.createUser(req, roles.STUDENT, user.organizationId);

    // send mail to student
    Emails.studentCreated(student, resetToken);

    return [200, { student }, `${student.username} has been added successfully`];
  }

  static async getAllStudents(req) {
    const { user } = req;
    const students = await UserController.findByRole(roles.STUDENT, {
      where: {
        organizationId: user.organizationId,
      },
      include: [
        {
          model: models.Course,
          as: 'courses',
        },
      ],
    });

    return [200, { students }];
  }
}

export default StudentController;
