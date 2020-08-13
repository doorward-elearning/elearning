import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Election } from '@doorward/common/models/Election';
import { ElectionVote } from '@doorward/common/models/ElectionVote';

export class ElectionNominees extends Model implements DBModel {
  public readonly id: string;
  public readonly profile: string;
  public readonly profilePicture: string;
  public readonly name: string;

  public readonly votes: Array<ElectionVote>;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  ElectionNominees.init(
    {
      profilePicture: DataTypes.STRING,
      profile: DataTypes.STRING,
      name: DataTypes.STRING,
      electionId: DataTypes.STRING,
    },
    { sequelize, tableName: 'ElectionNominees', paranoid: true }
  );

  return () => {
    ElectionNominees.belongsTo(Election, {
      foreignKey: 'electionId',
      as: 'election',
    });
    ElectionNominees.hasMany(ElectionVote, {
      foreignKey: 'nomineeId',
      as: 'votes',
    });
    return ElectionNominees;
  };
};
