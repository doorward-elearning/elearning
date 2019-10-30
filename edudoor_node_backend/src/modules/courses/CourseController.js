import models from '../../database/models';
import { CourseInclude, MyCoursesInclude } from '../../utils/includes';

class CourseController {
  static async createCourse(req) {
    const {
      body: { modules, ...other },
      user: { id: userId },
    } = req;

    const course = await models.Course.create(
      { ...other, createdBy: userId },
      {
        include: CourseInclude,
      }
    );

    await Promise.all(
      modules.map(async module => {
        await models.Module.create({
          ...module,
          courseId: course.id,
        });
      })
    );

    await course.reload();

    return [201, { course }, 'Course created successfully'];
  }

  static async getCourses(req) {
    const {
      user: { organizationId },
    } = req;
    const courses = await models.Course.findAll({
      include: MyCoursesInclude(organizationId),
    });

    return [200, { courses }];
  }
}

export default CourseController;
