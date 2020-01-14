import { DBModel } from '@edudoor/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from '@edudoor/common/models/User';
import { Role } from '@edudoor/common/models/Role';

export class UserRole extends Model implements DBModel {
  public readonly id: string;
  public userId: string;
  public roleId: string;

  public readonly user: User;
  public readonly role: Role;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  UserRole.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'UserRoles', paranoid: true }
  );

  return () => {
    UserRole.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserRole.belongsTo(Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
    return UserRole;
  };
};
