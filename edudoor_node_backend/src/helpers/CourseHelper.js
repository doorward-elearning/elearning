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
        [{ model: models.Module, as: 'modules' }, { model: models.ModuleItem, as: 'items' }, 'order', 'asc'],
      ],
    });
  }

  static courseItemStats(course) {
    return course.modules.reduce(
      (acc, module) => {
        const stats = CourseHelper.moduleItemStats(module);
        return {
          assignments: acc.assignments + stats.assignments,
          quizzes: acc.quizzes + stats.quizzes,
          pages: acc.pages + stats.pages,
        };
      },
      {
        assignments: 0,
        quizzes: 0,
        pages: 0,
      }
    );
  }

  static moduleItemStats(module) {
    return module.items.reduce(
      (acc, item) => {
        return {
          assignments: acc.assignments + (item.type === 'Assignment') ? 1 : 0,
          quizzes: acc.quizzes + (item.type === 'Quiz') ? 1 : 0,
          pages: acc.pages + (item.type === 'Page') ? 1 : 0,
        };
      },
      { assignments: 0, quizzes: 0, pages: 0 }
    );
  }
}

export default CourseHelper;
