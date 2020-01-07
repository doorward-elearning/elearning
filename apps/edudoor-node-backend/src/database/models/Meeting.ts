import { Meeting } from '@edudoor/common/models/Meeting';
import { Model } from 'sequelize';

class MeetingModel extends Model implements Meeting {
  createdAt: string;
  deletedAt: string;
  endedAt: string;
  id: string;
  numParticipants: number;
  sessionId: string;
  status: string;
  updatedAt: string;
}

export default (sequelize, DataTypes): typeof MeetingModel => {
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
