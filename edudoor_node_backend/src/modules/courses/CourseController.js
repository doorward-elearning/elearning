import models from '../../database/models';
import { CourseInclude, MyCoursesInclude } from '../../utils/includes';
import ModulesController from './modules/ModulesController';
import ModulesHelper from '../../helpers/ModulesHelper';
import CourseHelper from '../../helpers/CourseHelper';

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
        return ModulesController.createModule(course.id, module);
      })
    );

    await course.reload();

    return [201, { course }, 'Course created successfully'];
  }

  static async updateCourseModules(req) {
    const { body, params } = req;
    const { modules } = body;

    await Promise.all(modules.map(ModulesHelper.updateModule));

    const { modules: updatedModules } = await CourseHelper.getCourse(params.courseId);

    return [200, { modules: updatedModules }, 'Modules have been updated.'];
  }

  static async updateCourse(req) {
    const {
      body: { ...other },
      params: { courseId },
    } = req;

    const course = (await models.Course.update(
      { ...other },
      {
        where: { id: courseId },
        include: CourseInclude,
        returning: true,
      }
    ))[1][0];
    await course.reload();

    return [200, { course }, 'Course has been updated.'];
  }

  static async getCourses() {
    const courses = await models.Course.findAll({
      include: MyCoursesInclude(),
    });

    return [200, { courses }];
  }

  static async getCourse(req) {
    const {
      params: { courseId },
    } = req;
    const course = await CourseHelper.getCourse(courseId);

    course.dataValues.itemCount = CourseHelper.courseItemStats(course);

    return [200, { course }];
  }
}

export default CourseController;
