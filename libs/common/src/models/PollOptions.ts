import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Poll } from '@doorward/common/models/Poll';

export class PollOptions extends Model implements DBModel {
  public readonly id: string;
  public readonly option: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  PollOptions.init(
    {
      option: DataTypes.STRING,
      pollId: DataTypes.STRING,
    },
    { sequelize, tableName: 'PollOptions', paranoid: true }
  );

  return () => {
    PollOptions.belongsTo(Poll, {
      foreignKey: 'pollId',
      as: 'poll',
    });
    return PollOptions;
  };
};
