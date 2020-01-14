import { DBModel } from '@edudoor/common/models/DBModel';
import { User } from '@edudoor/common/models/User';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { GroupMember } from '@edudoor/common/models/GroupMember';
import OrganizationUtils from '@edudoor/common/utils/OrganizationUtils';

export class Group extends Model implements DBModel {
  public id: string;
  public name: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly members: Array<User>;
}

export default (sequelize: Sequelize) => {
  Group.init(
    {
      name: DataTypes.STRING,
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
      foreignKey: 'userId',
    });
    return Group;
  };
};
