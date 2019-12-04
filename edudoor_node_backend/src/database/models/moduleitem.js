module.exports = (sequelize, DataTypes) => {
  const ModuleItem = sequelize.define(
    'ModuleItem',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      order: DataTypes.INTEGER,
      content: {
        type: DataTypes.JSONB,
        get() {
          const current = this.dataValues.content || {};
          current.questions = this.dataValues.questions;
          delete this.dataValues.questions;
          return current;
        },
      },
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
    ModuleItem.hasMany(models.Question, {
      foreignKey: 'quizId',
      as: 'questions',
    });
  };
  return ModuleItem;
};
