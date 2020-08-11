import { Op } from 'sequelize';
import models from '../../../database/models';
import StudentController from '../../users/students/StudentController';
import UserController from '../../users/UserController';
import * as roles from '../../../utils/roles';
import MeetingRoomsHelper from '../../../helpers/MeetingRoomsHelper';
import { searchQuery } from '../../../utils/query';

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
    const query = searchQuery(req, ['firstName', 'lastName', 'email', 'username']);
    const registered = await models.sequelize.query('SELECT "studentId" from "StudentCourses" WHERE "courseId" = ?', {
      replacements: [params.courseId],
    });
    const ids = registered[0].map(student => student.studentId);
    const students = await UserController.findByRole(roles.STUDENT, {
      where: {
        id: {
          [Op.notIn]: ids,
        },
        ...query,
      },
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
      const course = await models.Course.findByPk(params.courseId);

      // add the student to this course
      await models.StudentCourse.create({
        studentId: student.id,
        courseId: params.courseId,
      });
      await MeetingRoomsHelper.joinMeetingRoom(course.meetingRoomId, student.id);

      return [201, { student }, `${student.username} has been added to the course`];
    }
  }

  static async unEnrollStudent(req) {
    const {
      params: { courseId, studentId },
    } = req;
    const course = await models.Course.findByPk(courseId);

    await models.StudentCourse.destroy({
      where: {
        studentId,
        courseId,
      },
    });

    await MeetingRoomsHelper.leaveMeetingRoom(course.meetingRoomId, studentId);

    return [200, undefined, 'Student has been enrolled from the course.'];
  }

  static async addStudent(req) {
    const {
      params: { courseId },
      body: { students },
    } = req;
    const course = await models.Course.findByPk(courseId);

    const studentList = await models.User.findAll({
      where: {
        id: students,
      },
    });

    await Promise.all(
      studentList.map(async student => {
        await models.StudentCourse.findOrCreate({
          defaults: {
            studentId: student.id,
            courseId,
          },
          where: {
            studentId: student.id,
            courseId,
          },
        });
        await MeetingRoomsHelper.joinMeetingRoom(course.meetingRoomId, student.id);
      })
    );
    return [200, { students: studentList }, 'Students have been added to the course'];
  }
}

export default StudentCourseController;
