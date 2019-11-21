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
    let module = await ModulesController.createModule(params.courseId, body);
    module = await models.Module.findByPk(module.id, {
      include: ModuleInclude,
    });
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

  static async getCourseModule({ params }) {
    const module = await models.Module.findOne({
      where: {
        id: params.moduleId,
      },
      include: [
        {
          model: models.ModuleItem,
          as: 'items',
        },
      ],
    });

    return [200, { module }];
  }

  static async createModule(courseId, moduleData) {
    return models.Module.create({
      ...moduleData,
      courseId,
    });
  }

  static async createModuleItem(req) {
    const { body, params, user } = req;
    const moduleItem = await models.ModuleItem.create({
      ...body,
      moduleId: params.moduleId,
      createdBy: user.id,
    });
    return [201, { item: moduleItem }, 'Item has been added to the module'];
  }

  static async getAllModuleItems(req) {
    const { params } = req;
    const items = await models.ModuleItem.findAll({
      where: {
        moduleId: params.moduleId,
        ...req.searchFields,
      },
      include: [
        {
          model: models.User,
          as: 'author',
        },
      ],
    });
    return [200, { items }];
  }
}

export default ModulesController;
