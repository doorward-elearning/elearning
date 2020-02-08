import { DBModel } from '@edudoor/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Role } from '@edudoor/common/models/Role';
import { User } from '@edudoor/common/models/User';

export class Organization extends Model implements DBModel {
  public id: string;
  public name: string;
  public icon: string;
  public description?: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  Organization.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    { sequelize, tableName: 'Organizations', paranoid: true }
  );

  return () => {
    Organization.hasMany(User, {
      foreignKey: 'organizationId',
      as: 'users',
    });
    Organization.hasMany(Role, {
      foreignKey: 'organizationId',
      as: 'roles',
    });
    return Organization;
  };
};
