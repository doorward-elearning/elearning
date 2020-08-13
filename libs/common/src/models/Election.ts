import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { Organization } from '@doorward/common/models/Organization';
import { ElectionNominees } from '@doorward/common/models/ElectionNominees';
import { User } from '@doorward/common/models/User';

export class Election extends Model implements DBModel {
  public readonly id: string;
  public readonly title: string;
  public readonly organizationId: string;

  public readonly organization: Organization;
  public readonly nominees: Array<ElectionNominees>;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly author: User;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  Election.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      title: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      organizationId: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'Elections',
      paranoid: true,
      defaultScope: {
        where: {
          organizationId: OrganizationUtils.getId(),
        },
      },
    }
  );

  return () => {
    Election.belongsTo(Organization, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
    Election.hasMany(ElectionNominees, {
      foreignKey: 'electionId',
      as: 'nominees',
    });
    Election.belongsTo(User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
    return Election;
  };
};
