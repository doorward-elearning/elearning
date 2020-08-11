import { DBModel } from '@doorward/common/models/DBModel';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { Conference } from '@doorward/common/models/Conference';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Module extends Model implements DBModel {
  public id: string;
  public title: string;
  public description?: string;
  public conferenceId: string;
  public order: number;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly conference: Conference;
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
    Module.belongsTo(Conference, {
      foreignKey: 'conferenceId',
      as: 'conference',
    });
    Module.hasMany(ModuleItem, {
      foreignKey: 'moduleId',
      as: 'items',
    });
    return Module;
  };
};
