import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Conference } from '@doorward/common/models/Conference';
import { PollOptions } from '@doorward/common/models/PollOptions';

export class Poll extends Model implements DBModel {
  public readonly id: string;
  public readonly title: string;

  public readonly conference: Conference;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  Poll.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      title: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      conferenceId: DataTypes.STRING,
    },
    { sequelize, tableName: 'Polls', paranoid: true }
  );

  return () => {
    Poll.belongsTo(Conference, {
      foreignKey: 'conferenceId',
      as: 'conference',
    });
    Poll.hasMany(PollOptions, {
      foreignKey: 'pollId',
      as: 'options',
    });
    return Poll;
  };
};
