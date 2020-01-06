export default (sequelize, DataTypes) => {
  const MeetingRoom = sequelize.define(
    'MeetingRoom',
    {
      title: DataTypes.STRING,
    },
    {}
  );
  MeetingRoom.associate = function(models) {
    MeetingRoom.hasOne(models.Course, {
      as: 'course',
      foreignKey: 'meetingRoomId',
    });
  };
  return MeetingRoom;
};
