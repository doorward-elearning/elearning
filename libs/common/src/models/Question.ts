import { DBModel } from '@doorward/common/models/DBModel';
import { Answer } from '@doorward/common/models/Answer';
import { Model, JSON, DataTypes, Sequelize } from 'sequelize';
import { ModuleItem } from '@doorward/common/models/ModuleItem';

export class Question extends Model implements DBModel {
  public id: string;
  public question: JSON;
  public points: number;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly answers: Array<Answer>;
}

export default (sequelize: Sequelize) => {
  Question.init(
    {
      question: DataTypes.JSON,
      points: DataTypes.INTEGER,
    },
    { sequelize, tableName: 'Questions', paranoid: true }
  );

  return () => {
    Question.belongsTo(ModuleItem, {
      as: 'quiz',
      foreignKey: 'quizId',
    });
    Question.hasMany(Answer, {
      as: 'answers',
      foreignKey: 'questionId',
    });
    return Question;
  };
};
