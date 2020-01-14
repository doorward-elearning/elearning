import { DBModel } from '@edudoor/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';

export class PasswordResets extends Model implements DBModel {
  public readonly id: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  PasswordResets.init(
    {
      token: DataTypes.STRING,
    },
    { sequelize, tableName: 'PasswordResets', paranoid: true }
  );

  return () => {
    PasswordResets.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
    return PasswordResets;
  };
};
