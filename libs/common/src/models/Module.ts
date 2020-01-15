import { DBModel } from '@edudoor/common/models/DBModel';
import { ModuleItem } from '@edudoor/common/models/ModuleItem';
import { Course } from '@edudoor/common/models/Course';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Module extends Model implements DBModel {
  public id: string;
  public title: string;
  public description?: string;
  public courseId: string;
  public order: number;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly course: Course;
  public  items: Array<ModuleItem>;
}

export default (sequelize: Sequelize) => {
  Module.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      order: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: 'Modules',
      paranoid: true,
    }
  );

  return () => {
    Module.belongsTo(Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
    Module.hasMany(ModuleItem, {
      foreignKey: 'moduleId',
      as: 'items',
    });
    return Module;
  };
};
