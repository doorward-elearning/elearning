module.exports = (sequelize, DataTypes) => {
  const LiveClassroom = sequelize.define(
    'LiveClassroom',
    {
      sessionId: DataTypes.STRING,
      courseId: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {}
  );
  LiveClassroom.associate = function(models) {
    LiveClassroom.belongsTo(models.Course, {
      as: 'course',
      foreignKey: 'courseId',
    });
  };
  return LiveClassroom;
};
