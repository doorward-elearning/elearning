module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define(
    'Meeting',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      sessionId: DataTypes.STRING,
      numParticipants: DataTypes.NUMBER,
      status: DataTypes.STRING,
      endedAt: DataTypes.DATE,
    },
    {}
  );
  Meeting.associate = function(models) {
    Meeting.belongsTo(models.User, {
      as: 'host',
      foreignKey: 'hostId',
    });
    Meeting.belongsTo(models.MeetingRoom, {
      as: 'meetingRoom',
      foreignKey: 'meetingRoomId',
    });
  };
  return Meeting;
};
