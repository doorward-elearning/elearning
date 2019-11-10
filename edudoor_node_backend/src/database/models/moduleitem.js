module.exports = (sequelize, DataTypes) => {
  const ModuleItem = sequelize.define(
    'ModuleItem',
    {
      title: DataTypes.STRING,
      content: DataTypes.JSONB,
      type: DataTypes.STRING,
    },
    {}
  );
  ModuleItem.associate = function(models) {
    ModuleItem.belongsTo(models.Module, {
      foreignKey: 'moduleId',
      as: 'module',
    });
    ModuleItem.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
  };
  return ModuleItem;
};
