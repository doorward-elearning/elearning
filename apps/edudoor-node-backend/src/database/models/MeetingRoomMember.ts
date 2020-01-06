export default (sequelize, DataTypes) => {
  const MeetingRoomMember = sequelize.define(
    'MeetingRoomMember',
    {
      role: DataTypes.STRING,
    },
    {}
  );
  MeetingRoomMember.associate = function(models) {
    MeetingRoomMember.belongsTo(models.User, {
      as: 'participant',
      foreignKey: 'participantId',
    });
    MeetingRoomMember.belongsTo(models.MeetingRoom, {
      as: 'meetingRoom',
      foreignKey: 'meetingRoomId',
    });
  };
  return MeetingRoomMember;
};
