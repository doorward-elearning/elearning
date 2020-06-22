import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';
import Emails from '../../../utils/Emails';
import bcrypt from 'bcrypt';
import { User } from '../../../../../../libs/common/src/models/User';
import { searchQuery } from '../../../utils/query';

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

  static async getAllStudents(req) {
    const result = await UserController.paginate<User>(req, roles.STUDENT, {
      where: searchQuery(req, ['username', 'firstName', 'lastName', 'email']),
      include: [
        {
          model: models.Course,
          as: 'courses',
          required: false,
        },
      ],
    });

    return [200, { students: result.model }, undefined, { pagination: result.pagination }];
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
