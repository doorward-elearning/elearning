import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Role } from '@doorward/common/models/Role';
import { User } from '@doorward/common/models/User';
import { MeetingPlatform } from '@doorward/common/types/meeting';

export class Organization extends Model implements DBModel {
  public id: string;
  public name: string;
  public icon: string;
  public darkThemeIcon: string;
  public link: string;
  public description?: string;
  public meetingPlatform?: MeetingPlatform;

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
      darkThemeIcon: DataTypes.STRING,
      link: DataTypes.STRING,
      description: DataTypes.TEXT,
      meetingPlatform: DataTypes.ENUM('Openvidu', 'Jitsi'),
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
      as: 'defaultRoles.js',
    });
    return Organization;
  };
};
