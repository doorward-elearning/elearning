import UserController from '../users/UserController';
import * as roles from '../../utils/roles';
import models from '../../database/models';

class ReportsController {
  static async membersReport() {
    const members = await UserController.findByRole(roles.MEMBER);

    return [200, { members }];
  }

  static async teachersReport() {
    const teachers = await UserController.findByRole(roles.TEACHER, {
      include: [
        {
          model: models.Course,
          as: 'authoredCourses',
        },
      ],
    });

    return [200, { teachers }];
  }

  static async teacherReport(req) {
    const teacher = await models.User.findOne({
      where: {
        id: req.params.teacherId,
      },
      include: [
        {
          model: models.Course,
          as: 'authoredCourses',
        },
      ],
    });

    return [200, { teacher }];
  }

  static async memberReport(req) {
    const coursesInProgress = await models.MemberCourse.findAll({
      where: {
        memberId: req.params.memberId,
      },
      include: [
        {
          model: models.Course,
          as: 'course',
        },
      ],
    });
    const member = await UserController.findOneByRole(roles.MEMBER, {
      where: {
        id: req.params.memberId,
      },
    });
    member.dataValues.coursesInProgress = coursesInProgress.map(memberCourse => memberCourse.course);
    return [200, { member }];
  }
}

export default ReportsController;
