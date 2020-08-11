import { DBModel } from '@doorward/common/models/DBModel';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { Forum } from '@doorward/common/models/Forum';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Module extends Model implements DBModel {
  public id: string;
  public title: string;
  public description?: string;
  public forumId: string;
  public order: number;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly forum: Forum;
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
    Module.belongsTo(Forum, {
      foreignKey: 'forumId',
      as: 'forum',
    });
    Module.hasMany(ModuleItem, {
      foreignKey: 'moduleId',
      as: 'items',
    });
    return Module;
  };
};
