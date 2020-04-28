import { DBModel } from '@edudoor/common/models/DBModel';
import { User } from '@edudoor/common/models/User';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { GroupMember } from '@edudoor/common/models/GroupMember';
import OrganizationUtils from '../../../../apps/edudoor-node-backend/src/utils/OrganizationUtils';

export class Group extends Model implements DBModel {
  public id: string;
  public name: string;
  public type: string;
  public createdBy: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly creator: User;
  public readonly members: Array<User>;
}

export default (sequelize: Sequelize) => {
  Group.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      organizationId: DataTypes.STRING,
    },
    {
      tableName: 'Groups',
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
    Group.belongsToMany(User, {
      as: 'members',
      through: GroupMember,
      foreignKey: 'groupId',
    });
    Group.belongsTo(User, {
      as: 'creator',
      foreignKey: 'createdBy',
    });
    return Group;
  };
};
