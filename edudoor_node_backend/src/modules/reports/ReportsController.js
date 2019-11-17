import UserController from '../users/UserController';
import * as roles from '../../utils/roles';

class ReportsController {
  static async studentsReport(req) {
    const students = await UserController.findByRole(roles.STUDENT);

    return [200, { students }];
  }

  static async studentReport(req) {
    const student = await UserController.findOneByRole(roles.STUDENT, {
      where: {
        id: req.params.studentId,
      },
      include: [
        {
          model: models.Course,
          as: 'coursesInProgress',
        },
      ],
    });
    return [200, { student }];
  }
}

export default ReportsController;
