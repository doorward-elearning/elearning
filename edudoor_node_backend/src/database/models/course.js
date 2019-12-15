module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      objectives: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    { paranoid: true }
  );
  Course.associate = function(models) {
    Course.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
    Course.hasMany(models.Module, {
      foreignKey: 'courseId',
      as: 'modules',
    });
    Course.belongsToMany(models.User, {
      foreignKey: 'courseId',
      as: 'students',
      through: models.StudentCourse,
    });
    Course.hasMany(models.MeetingRoom, {
      foreignKey: 'courseId',
      as: 'rooms',
    });
  };
  return Course;
};
