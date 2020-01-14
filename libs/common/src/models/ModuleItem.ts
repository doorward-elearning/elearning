import { DBModel } from '@edudoor/common/models/DBModel';
import { Question } from '@edudoor/common/models/Question';
import { ModuleItemTypes } from '@edudoor/common/models/index';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';
import { Module } from '@edudoor/common/models/Module';

export class ModuleItem extends Model implements DBModel {
  public id: string;
  public title: string;
  public content: any;
  public order: number;
  public type: ModuleItemTypes;
  public questions: Array<Question>;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  ModuleItem.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      order: DataTypes.INTEGER,
      content: {
        type: DataTypes.JSONB,
        get() {
          const current = this.dataValues.content || {};
          current.questions = this.dataValues.questions;
          delete this.dataValues.questions;
          return current;
        },
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'ModuleItems',
      paranoid: true,
    }
  );

  return () => {
    ModuleItem.belongsTo(Module, {
      foreignKey: 'moduleId',
      as: 'Module.ts',
    });
    ModuleItem.belongsTo(User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
    ModuleItem.hasMany(Question, {
      foreignKey: 'quizId',
      as: 'questions',
    });
    return ModuleItem;
  };
};
