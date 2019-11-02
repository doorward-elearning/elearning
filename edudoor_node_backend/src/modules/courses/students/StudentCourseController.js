import models from '../../../database/models';
import StudentController from '../../users/students/StudentController';

class StudentCourseController {
  static async getStudents(req) {
    const { params } = req;
    const students = await StudentCourseController.getStudentsByCourse(params.courseId);

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
