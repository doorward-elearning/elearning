import UserController from '../UserController';
import * as roles from '../../../utils/roles';
import Emails from '../../../utils/Emails';
import Organization from '../../../utils/Organization';

class TeacherController {
  static async createTeacher(req) {
    const { user: teacher, resetToken } = await UserController.createUser(req, roles.TEACHER);

    // send mail to teacher
    Emails.teacherCreated(teacher, resetToken, req.query.redirect_origin || req.headers.origin);

    return [200, { teacher }, `${teacher.username} has been added successfully`];
  }

  static async getAllTeachers() {
    const teachers = await UserController.findByRole(roles.TEACHER, {
      where: {
        organizationId: Organization.getId(),
      },
    });

    return [200, { teachers }];
  }
}

export default TeacherController;
