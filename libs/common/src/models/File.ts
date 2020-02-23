import { DBModel } from '@edudoor/common/models/DBModel';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from '@edudoor/common/models/User';
import OrganizationUtils from '@edudoor/common/utils/OrganizationUtils';

export class File extends Model implements DBModel {
  createdAt: Date;
  deletedAt: Date;
  id: string;
  updatedAt: Date;
  name: string;
  owner: User;
  publicUrl: string;
}

export default (sequelize: Sequelize) => {
  File.init(
    {
      name: DataTypes.STRING,
      publicUrl: DataTypes.STRING,
      ownerId: DataTypes.STRING,
    },
    {
      tableName: 'Files',
      sequelize,
      paranoid: true,
      defaultScope: {
        where: {
          organizationId: OrganizationUtils.getId(),
        },
      },
    }
  );

  return () => {
    File.belongsTo(User, {
      as: 'owner',
      foreignKey: 'ownerId',
    });

    return File;
  };
};
