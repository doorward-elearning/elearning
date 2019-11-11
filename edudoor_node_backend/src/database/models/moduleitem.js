module.exports = (sequelize, DataTypes) => {
  const ModuleItem = sequelize.define(
    'ModuleItem',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
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
