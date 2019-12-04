import models from '../database/models';
import { MyCoursesInclude } from '../utils/includes';

class CourseHelper {
  static async getCourse(courseId) {
    return models.Course.findOne({
      where: { id: courseId },
      include: MyCoursesInclude(),
      order: [
        [
          {
            model: models.Module,
            as: 'modules',
          },
          'order',
          'asc',
        ],
      ],
    });
  }
}

export default CourseHelper;
