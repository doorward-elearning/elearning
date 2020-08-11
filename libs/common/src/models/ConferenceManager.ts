import { DBModel } from '@doorward/common/models/DBModel';
import { User } from '@doorward/common/models/User';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Conference } from '@doorward/common/models/Conference';

export class ConferenceManager extends Model implements DBModel {
  public id: string;
  public managerId: string;
  public conferenceId: string;
  public enrolledById: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly enrolledBy: User;
  public readonly manager: User;
  public readonly conference: Conference;
}

export default (sequelize: Sequelize) => {
  ConferenceManager.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      managerId: DataTypes.STRING,
      conferenceId: DataTypes.STRING,
      enrolledById: DataTypes.STRING,
    },
    {
      tableName: 'ConferenceManagers',
      sequelize,
      paranoid: true,
      defaultScope: {},
    }
  );
  return () => {
    ConferenceManager.belongsTo(User, {
      as: 'manager',
      foreignKey: 'managerId',
    });

    ConferenceManager.belongsTo(User, {
      as: 'enrolledBy',
      foreignKey: 'enrolledById',
    });

    ConferenceManager.belongsTo(Conference, {
      as: 'conference',
      foreignKey: 'conferenceId',
    });
    return ConferenceManager;
  };
};
