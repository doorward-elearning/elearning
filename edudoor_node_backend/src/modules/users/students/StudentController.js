import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';

class StudentController {
  static async createStudent(req) {
    const { user } = req;
    const student = await UserController.createUser(req, roles.STUDENT, user.organizationId);

    return [200, { student }, `${student.username} has been added successfully`];
  }

  static async getAllStudents(req) {
    const { user } = req;
    const students = await models.User.findAll({
      where: {
        organizationId: user.organizationId,
      },
      include: [
        {
          model: models.Role,
          as: 'roles',
          where: {
            name: roles.STUDENT,
          },
        },
      ],
    });

    return [200, { students }];
  }
}

export default StudentController;
