import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';
import { Conference } from './Conference';

export class MemberConference extends Model implements DBModel {
  public id: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  MemberConference.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conferenceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
    },
    { sequelize, tableName: 'MemberConferences', paranoid: true }
  );

  return () => {
    MemberConference.belongsTo(User, {
      foreignKey: 'memberId',
      as: 'member',
    });
    MemberConference.belongsTo(Conference, {
      foreignKey: 'conferenceId',
      as: 'conference',
    });
    return MemberConference;
  };
};
