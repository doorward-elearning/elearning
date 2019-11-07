import Sequelize, { Op } from 'sequelize';
import models from '../../../database/models';
import StudentController from '../../users/students/StudentController';
import UserController from '../../users/UserController';
import * as roles from '../../../utils/roles';

class StudentCourseController {
  static async getStudents(req) {
    const { params } = req;
    const students = await StudentCourseController.getStudentsByCourse(params.courseId);

    return [200, { students }];
  }

  /**
   * Get the list of students that are not registered to a particular course
   * @param req
   * @returns {Promise<*[]>}
   */
  static async getStudentsNotRegistered(req) {
    const { params } = req;
    const students = await UserController.findByRole(roles.STUDENT, {
      where: Sequelize.literal(
        `"User"."id" NOT IN (SELECT "studentId" from "StudentCourses" WHERE "courseId" = ${params.courseId})`
      ),
    });
    return [200, { students }];
  }

  static async getStudentsByCourse(courseId) {
    return models.User.findAll({
      include: [
        {
          model: models.Course,
          as: 'courses',
          where: {
            id: courseId,
          },
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  static async createStudent(req) {
    const { params } = req;
    const result = await StudentController.createStudent(req);
    if (result) {
      const { student } = result[1];

      // add the student to this course
      await models.StudentCourse.create({
        studentId: student.id,
        courseId: params.courseId,
      });

      return [201, { student }, `${student.username} has been added to the course`];
    }
  }
}

export default StudentCourseController;
