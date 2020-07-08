import models from '../database/models';

class ModulesHelper {
  static async updateModule(module) {
    const result = await models.Module.update(
      {
        ...module,
      },
      {
        where: {
          id: module.id,
        },
        returning: true,
      }
    );

    // update the module items
    const items = await Promise.all(
      (module.items || []).map(async item => {
        return ModulesHelper.updateModuleItem({ ...item, moduleId: module.id });
      })
    );

    const newModule = result[1][0];
    if (newModule) {
      newModule.items = items;
    }
    return newModule;
  }

  static async updateModuleItem(moduleItem) {
    const result = await models.ModuleItem.update(
      {
        ...moduleItem,
      },
      {
        where: {
          id: moduleItem.id,
        },
        returning: true,
      }
    );
    return result[1][0];
  }
}

export default ModulesHelper;
