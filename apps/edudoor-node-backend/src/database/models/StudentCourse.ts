export default (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define(
    'StudentCourse',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
    },
    { paranoid: true }
  );
  StudentCourse.associate = function(models) {
    StudentCourse.belongsTo(models.User, {
      foreignKey: 'studentId',
      as: 'student',
    });
    StudentCourse.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
  };
  return StudentCourse;
};
