import { DBModel } from '@edudoor/common/models/DBModel';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Question } from '@edudoor/common/models/Question';

export class Answer extends Model implements DBModel {
  public id: string;
  public answer: string;
  public description: any;
  public correct: boolean;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public static associations: {};
}

export default (sequelize: Sequelize) => {
  Answer.init(
    {
      answer: DataTypes.JSON,
      description: DataTypes.JSON,
      correct: DataTypes.BOOLEAN,
    },
    {
      tableName: 'Answers',
      sequelize,
      paranoid: true,
    }
  );
  return () => {
    Answer.belongsTo(Question, {
      as: 'question',
      foreignKey: 'questionId',
    });
    return Answer;
  };
};
