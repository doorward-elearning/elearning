import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { MeetingRoom } from './MeetingRoom';
import { User } from './User';

export class MeetingRoomMember extends Model implements DBModel {
  public readonly id: string;
  public role: string;
  public meetingRoomId: string;
  public participantId: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  MeetingRoomMember.init(
    {
      role: DataTypes.STRING,
    },
    { sequelize, tableName: 'MeetingRoomMembers', paranoid: true }
  );

  return () => {
    MeetingRoomMember.belongsTo(User, {
      as: 'participant',
      foreignKey: 'participantId',
    });
    MeetingRoomMember.belongsTo(MeetingRoom, {
      as: 'meetingRoom',
      foreignKey: 'meetingRoomId',
    });
    return MeetingRoomMember;
  };
};
