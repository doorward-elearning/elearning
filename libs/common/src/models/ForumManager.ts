import { DBModel } from '@doorward/common/models/DBModel';
import { User } from '@doorward/common/models/User';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Forum } from '@doorward/common/models/Forum';

export class ForumManager extends Model implements DBModel {
  public id: string;
  public managerId: string;
  public forumId: string;
  public enrolledById: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly enrolledBy: User;
  public readonly manager: User;
  public readonly forum: Forum;
}

export default (sequelize: Sequelize) => {
  ForumManager.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      managerId: DataTypes.STRING,
      forumId: DataTypes.STRING,
      enrolledById: DataTypes.STRING,
    },
    {
      tableName: 'ForumManagers',
      sequelize,
      paranoid: true,
      defaultScope: {},
    }
  );
  return () => {
    ForumManager.belongsTo(User, {
      as: 'manager',
      foreignKey: 'managerId',
    });

    ForumManager.belongsTo(User, {
      as: 'enrolledBy',
      foreignKey: 'enrolledById',
    });

    ForumManager.belongsTo(Forum, {
      as: 'forum',
      foreignKey: 'forumId',
    });
    return ForumManager;
  };
};
