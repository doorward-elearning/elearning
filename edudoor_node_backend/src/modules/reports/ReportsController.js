import UserController from '../users/UserController';
import * as roles from '../../utils/roles';

class ReportsController {
  static async studentsReport(req) {
    const students = await UserController.findByRole(roles.STUDENT);

    return [200, { students }];
  }

  static async studentReport(req) {
    const coursesInProgress = await models.StudentCourse.findAll({
      where: {
        studentId: req.params.studentId,
      },
      include: [
        {
          model: models.Course,
          as: 'course',
        },
      ],
    });
    const student = await UserController.findOneByRole(roles.STUDENT, {
      where: {
        id: req.params.studentId,
      },
    });
    student.dataValues.coursesInProgress = coursesInProgress.map(studentCourse => studentCourse.course);
    return [200, { student }];
  }
}

export default ReportsController;
