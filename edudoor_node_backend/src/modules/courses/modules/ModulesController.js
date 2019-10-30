import models from '../../../database/models';
import { ModuleInclude } from '../../../utils/includes';

class ModulesController {
  static async getCourseModules(req) {
    const { courseId } = req.params;
    const modules = await models.Module.findAll({
      where: {
        courseId,
      },
      include: ModuleInclude,
    });

    return [200, { modules }];
  }

  static async addCourseModule({ body, params }) {
    const module = await ModulesController.createModule(params.courseId, body);
    return [201, { module }, 'Module has been added to the course'];
  }

  static async updateCourseModule({ body, params }) {
    const module = await models.Module.findByPk(params.moduleId);
    await module.update({
      ...body,
    });
    await module.reload();

    return [200, { module }, `${module.title} has been updated`];
  }

  static async createModule(courseId, moduleData) {
    return models.Module.create({
      ...moduleData,
      courseId,
    });
  }
}

export default ModulesController;
