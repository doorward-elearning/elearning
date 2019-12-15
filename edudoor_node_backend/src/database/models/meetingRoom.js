module.exports = (sequelize, DataTypes) => {
  const MeetingRoom = sequelize.define(
    'MeetingRoom',
    {
      sessionId: DataTypes.STRING,
      sessionName: DataTypes.STRING,
      courseId: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {}
  );
  MeetingRoom.associate = function(models) {
    MeetingRoom.belongsTo(models.Course, {
      as: 'course',
      foreignKey: 'courseId',
    });
  };
  return MeetingRoom;
};
