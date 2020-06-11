import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';
import Emails from '../../../utils/Emails';
import bcrypt from 'bcrypt';

class StudentController {
  static async createStudent(req) {
    const { user: student, resetToken, originalPassword } = await UserController.createUser(req, roles.STUDENT);

    // send mail to student
    if (originalPassword) {
      Emails.studentCreatedWithPassword(student, resetToken, req.headers.origin, originalPassword);
    } else {
      Emails.studentCreated(student, resetToken, req.headers.origin);
    }

    return [200, { student }, `${student.username} has been added successfully`];
  }

  static async updateStudentPassword(req) {
    const {
      body: { password },
      params: { studentId },
    } = req;

    const student = await models.User.findByPk(studentId);

    await student.update({
      password: bcrypt.hashSync(password, +process.env.BCRYPT_PASSWORD_SALT),
    });

    Emails.studentPasswordChanged(student, password);

    return [200, undefined, 'Password changed successfully'];
  }

  static async updateStudent(req) {
    const {
      body,
      params: { studentId },
    } = req;
    const student = await models.User.findByPk(studentId);

    const data = { ...body };

    delete data.password;

    student.update({ ...data });

    return [200, { student }, `${student.username} has been updated successfully`];
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

  static async getStudent(req) {
    const {
      params: { studentId },
    } = req;
    const student = await UserController.findOneByRole(roles.STUDENT, {
      where: {
        id: studentId,
      },
      include: [
        {
          model: models.Course,
          as: 'courses',
          required: false,
        },
      ],
    });

    return [200, { student }];
  }
}

export default StudentController;
