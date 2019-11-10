module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    { paranoid: true }
  );
  Module.associate = function(models) {
    Module.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
    Module.hasMany(models.ModuleItem, {
      foreignKey: 'moduleId',
      as: 'items',
    });
  };
  return Module;
};
