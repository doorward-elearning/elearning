import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';
import { Forum } from './Forum';

export class MemberForum extends Model implements DBModel {
  public id: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  MemberForum.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      forumId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
    },
    { sequelize, tableName: 'MemberForums', paranoid: true }
  );

  return () => {
    MemberForum.belongsTo(User, {
      foreignKey: 'memberId',
      as: 'member',
    });
    MemberForum.belongsTo(Forum, {
      foreignKey: 'forumId',
      as: 'forum',
    });
    return MemberForum;
  };
};
