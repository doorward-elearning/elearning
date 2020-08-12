import { MeetingRoom } from './MeetingRoom';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { MemberConference } from './MemberConference';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { Member } from './Member';
import { User } from './User';
import { DBModel } from './DBModel';
import { Module } from './Module';
import { ConferenceManager } from '@doorward/common/models/ConferenceManager';
import { Poll } from '@doorward/common/models/Poll';

export class Conference extends Model implements DBModel {
  public id: string;
  public title: string;
  public description?: string;
  public objectives?: string;
  public requirements?: string;
  public status: string;
  public authorId: string;
  public meetingRoomId: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly author: User;
  public readonly modules: Array<Module>;
  public readonly numMembers: string;
  public readonly meetingRoom: MeetingRoom;
  public readonly itemCount: {
    assignments: number;
    quizzes: number;
    pages: number;
  };
  public readonly members: Array<Member>;
  public readonly polls: Array<Poll>;
}

export default (sequelize: Sequelize) => {
  Conference.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      organizationId: DataTypes.STRING,
      objectives: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      tableName: 'Conferences',
      sequelize,
      paranoid: true,
      defaultScope: {
        where: {
          organizationId: OrganizationUtils.getId(),
        },
      },
    }
  );

  return () => {
    Conference.belongsTo(User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
    Conference.hasMany(Module, {
      foreignKey: 'conferenceId',
      as: 'modules',
    });
    Conference.belongsToMany(User, {
      foreignKey: 'conferenceId',
      as: 'members',
      through: MemberConference,
    });
    Conference.belongsTo(MeetingRoom, {
      foreignKey: 'meetingRoomId',
      as: 'meetingRoom',
    });
    Conference.belongsToMany(User, {
      foreignKey: 'conferenceId',
      otherKey: 'managerId',
      as: 'managers',
      through: ConferenceManager,
    });
    Conference.hasMany(Poll, {
      foreignKey: 'conferenceId',
      as: 'polls',
    });
    return Conference;
  };
};
