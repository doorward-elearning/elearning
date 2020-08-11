import { DBModel } from '@doorward/common/models/DBModel';
import { Meeting } from '@doorward/common/models/Meeting';
import { DataTypes, Model, Sequelize } from 'sequelize';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { Forum } from './Forum';

export class MeetingRoom extends Model implements DBModel {
  public id: string;
  public title: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly currentMeeting: Meeting;
}

export default (sequelize: Sequelize) => {
  MeetingRoom.init(
    {
      title: DataTypes.STRING,
      organizationId: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'MeetingRooms',
      paranoid: true,
      defaultScope: {
        where: {
          organizationId: OrganizationUtils.getId(),
        },
      },
    }
  );

  return () => {
    MeetingRoom.hasOne(Forum, {
      as: 'forum',
      foreignKey: 'meetingRoomId',
    });
    MeetingRoom.hasOne(Meeting, {
      as: 'currentMeeting',
      foreignKey: 'meetingRoomId',
    });
    return MeetingRoom;
  };
};
