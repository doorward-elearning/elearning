import { DBModel } from '@edudoor/common/models/DBModel';
import { MeetingRoom } from './MeetingRoom';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from '@edudoor/common/models/User';

export class Meeting extends Model implements DBModel {
  public id: string;
  public sessionId: string;
  public numParticipants: number;
  public status: string;
  public endedAt: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly meetingRoom: MeetingRoom;
}

export default (sequelize: Sequelize) => {
  Meeting.init(
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
    {
      sequelize,
      tableName: 'Meetings',
      paranoid: true,
    }
  );
  return () => {
    Meeting.belongsTo(User, {
      as: 'host',
      foreignKey: 'hostId',
    });
    Meeting.belongsTo(MeetingRoom, {
      as: 'meetingRoom',
      foreignKey: 'meetingRoomId',
    });
    return Meeting;
  };
};
