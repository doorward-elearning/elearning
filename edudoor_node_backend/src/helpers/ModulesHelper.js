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
    return result[1][0];
  }
}

export default ModulesHelper;
