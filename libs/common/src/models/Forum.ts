import { MeetingRoom } from './MeetingRoom';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { MemberForum } from './MemberForum';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { Member } from './Member';
import { User } from './User';
import { DBModel } from './DBModel';
import { Module } from './Module';
import { ForumManager } from '@doorward/common/models/ForumManager';

export class Forum extends Model implements DBModel {
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
}

export default (sequelize: Sequelize) => {
  Forum.init(
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
      tableName: 'Forums',
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
    Forum.belongsTo(User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
    Forum.hasMany(Module, {
      foreignKey: 'forumId',
      as: 'modules',
    });
    Forum.belongsToMany(User, {
      foreignKey: 'forumId',
      as: 'members',
      through: MemberForum,
    });
    Forum.belongsTo(MeetingRoom, {
      foreignKey: 'meetingRoomId',
      as: 'meetingRoom',
    });
    Forum.belongsToMany(User, {
      foreignKey: 'forumId',
      otherKey: 'managerId',
      as: 'managers',
      through: ForumManager,
    });
    return Forum;
  };
};
