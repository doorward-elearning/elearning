import { DBModel } from '@doorward/common/models/DBModel';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from '@doorward/common/models/User';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { Organization } from '@doorward/common/models/Organization';

export class File extends Model implements DBModel {
  createdAt: Date;
  deletedAt: Date;
  id: string;
  updatedAt: Date;
  name: string;
  publicUrl: string;
  ownerId: string;
  organizationId: string;
  publicFile: boolean;

  owner: User;
  organization: Organization;
}

export default (sequelize: Sequelize) => {
  File.init(
    {
      name: DataTypes.STRING,
      publicUrl: DataTypes.STRING,
      ownerId: DataTypes.STRING,
      organizationId: DataTypes.STRING,
      publicFile: DataTypes.BOOLEAN,
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
