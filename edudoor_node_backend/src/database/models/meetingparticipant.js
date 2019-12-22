module.exports = (sequelize, DataTypes) => {
  const MeetingParticipant = sequelize.define(
    'MeetingParticipant',
    {
      meetingRoomId: DataTypes.STRING,
      participantId: DataTypes.STRING,
    },
    {}
  );
  MeetingParticipant.associate = function(models) {
    MeetingParticipant.belongsTo(models.User, {
      as: 'participant',
      foreignKey: 'participantId',
    });
    MeetingParticipant.belongsTo(models.MeetingRoom, {
      as: 'meetingRoom',
      foreignKey: 'meetingRoomId',
    });
  };
  return MeetingParticipant;
};
