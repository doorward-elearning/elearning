import UserController from '../UserController';
import * as roles from '../../../utils/roles';
import Emails from '../../../utils/Emails';
import OrganizationUtils from '../../../utils/OrganizationUtils';

class TeacherController {
  static async createTeacher(req) {
    const { user: teacher, resetToken, originalPassword } = await UserController.createUser(req, roles.TEACHER);

    // send mail to teacher
    if (originalPassword) {
      Emails.teacherCreatedWithPassword(teacher, req.query.redirect_origin || req.headers.origin, originalPassword);
    } else {
      Emails.teacherCreated(teacher, resetToken, req.query.redirect_origin || req.headers.origin);
    }

    return [200, { teacher }, `${teacher.username} has been added successfully`];
  }

  static async getAllTeachers() {
    const teachers = await UserController.findByRole(roles.TEACHER, {
      where: {
        organizationId: OrganizationUtils.getId(),
      },
    });

    return [200, { teachers }];
  }
}

export default TeacherController;
