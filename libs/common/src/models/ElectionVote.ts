import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { ElectionNominees } from '@doorward/common/models/ElectionNominees';

export class ElectionVote extends Model implements DBModel {
  public readonly id: string;
  public readonly optionId: string;
  public readonly nomineeId: string;
  public readonly voterId: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  ElectionVote.init(
    {
      nomineeId: DataTypes.STRING,
      voterId: DataTypes.STRING,
    },
    { sequelize, tableName: 'ElectionVotes', paranoid: true }
  );

  return () => {
    ElectionVote.belongsTo(ElectionNominees, {
      foreignKey: 'nomineeId',
      as: 'nominee',
    });
    return ElectionVote;
  };
};
