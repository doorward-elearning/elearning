import { DBModel } from '@edudoor/common/models/DBModel';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './User';
import { Group } from './Group';

export class GroupMember extends Model implements DBModel {
  public id: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  GroupMember.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role: DataTypes.ENUM('ADMINISTRATOR', 'PARTICIPANT'),
    },
    {
      tableName: 'GroupMembers',
      sequelize,
      paranoid: true,
    }
  );

  return () => {
    GroupMember.belongsTo(User, {
      as: 'member',
      foreignKey: 'userId',
    });
    GroupMember.belongsTo(Group, {
      as: 'group',
      foreignKey: 'groupId',
    });
    return GroupMember;
  };
};
