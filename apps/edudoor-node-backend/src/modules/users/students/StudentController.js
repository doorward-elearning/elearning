import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';
import Emails from '../../../utils/Emails';
import OrganizationUtils from '../../../../../../libs/common/src/utils/OrganizationUtils';

class StudentController {
  static async createStudent(req) {
    const { user: student, resetToken } = await UserController.createUser(req, roles.STUDENT);

    // send mail to student
    Emails.studentCreated(student, resetToken, req.headers.origin);

    return [200, { student }, `${student.username} has been added successfully`];
  }

  static async getAllStudents() {
    const students = await UserController.findByRole(roles.STUDENT, {
      where: {
        organizationId: OrganizationUtils.getId(),
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
