import { DBModel } from '@edudoor/common/models/DBModel';
import { Meeting } from '@edudoor/common/models/Meeting';
import { DataTypes, Model, Sequelize } from 'sequelize';
import OrganizationUtils from '../../../../apps/edudoor-node-backend/src/utils/OrganizationUtils';
import { Course } from './Course';

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
    MeetingRoom.hasOne(Course, {
      as: 'course',
      foreignKey: 'meetingRoomId',
    });
    MeetingRoom.hasOne(Meeting, {
      as: 'currentMeeting',
      foreignKey: 'meetingRoomId',
    });
    return MeetingRoom;
  };
};
