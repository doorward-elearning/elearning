import { DBModel } from '@edudoor/common/models/DBModel';
import { Organization } from '@edudoor/common/models/Organization';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';
import { UserRole } from '@edudoor/common/models/UserRole';

export class Role extends Model implements DBModel {
  public id: string;
  public name: string;
  public description?: string;
  public organizationId: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly organization: Organization;
}

export default (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'Roles',
      paranoid: true,
    }
  );

  return () => {
    Role.belongsToMany(User, {
      foreignKey: 'roleId',
      through: UserRole,
      as: 'users',
    });
    Role.belongsTo(Organization, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
    return Role;
  };
};
