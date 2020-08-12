import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { PollOptions } from '@doorward/common/models/PollOptions';

export class PollVote extends Model implements DBModel {
  public readonly id: string;
  public readonly optionId: string;
  public readonly voterId: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  PollVote.init(
    {
      optionId: DataTypes.STRING,
      voterId: DataTypes.STRING,
    },
    { sequelize, tableName: 'PollVotes', paranoid: true }
  );

  return () => {
    PollVote.belongsTo(PollOptions, {
      foreignKey: 'optionId',
      as: 'option',
    });
    return PollVote;
  };
};
