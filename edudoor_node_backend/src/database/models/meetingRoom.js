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
    MeetingRoom.belongsToMany(models.User, {
      as: 'participants',
      through: models.MeetingParticipant,
      foreignKey: 'meetingRoomId',
    });
  };
  return MeetingRoom;
};
