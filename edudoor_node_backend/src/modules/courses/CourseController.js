import models from '../../database/models';
import { CourseInclude } from '../../utils/includes';

class CourseController {
  static async createCourse(req) {
    const {
      body: { modules, ...other },
      user: { id: userId },
    } = req;

    const course = await models.Course.create(
      { ...other, creatorId: userId },
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
}

export default CourseController;
