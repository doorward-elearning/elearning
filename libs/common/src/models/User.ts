import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Group } from './Group';
import { PasswordResets } from './PasswordResets';
import { GroupMember } from './GroupMember';
import { MemberForum } from './MemberForum';
import { Forum } from '@doorward/common/models/Forum';
import { UserRole } from '@doorward/common/models/UserRole';
import { DBModel } from '@doorward/common/models/DBModel';
import { Organization } from '@doorward/common/models/Organization';
import { Role } from '@doorward/common/models/Role';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { ForumManager } from './ForumManager';
const sequelizePaginate = require('sequelize-paginate');

export class User extends Model implements DBModel {
  public id: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public zipCode: string;
  public country: string;
  public city: string;
  public organizationId: string;
  public status: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly fullName: string;

  public readonly organization?: Organization;
  public readonly roles?: Array<Role>;

  public static associations: {
    organization: Association<User, Organization>;
    roles: Association<User, Role>;
  };
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const model = this;
          let fullName = model.username;
          if (model.firstName) {
            fullName = model.firstName;
          }
          if (model.lastName) {
            fullName += ` ${model.lastName}`;
          }

          return fullName;
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      zipCode: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      status: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      tableName: 'Users',
      sequelize,
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password'],
          include: ['fullName'],
        },
        where: {
          organizationId: OrganizationUtils.getId(),
        },
      },
    }
  );

  return () => {
    User.belongsToMany(Role, {
      foreignKey: 'userId',
      as: 'roles',
      through: UserRole,
    });
    User.belongsTo(Organization, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
    User.hasMany(Forum, {
      foreignKey: 'createdBy',
      as: 'authoredForums',
    });
    User.belongsToMany(Forum, {
      foreignKey: 'memberId',
      as: 'forums',
      through: MemberForum,
    });
    User.hasMany(PasswordResets, {
      foreignKey: 'userId',
      as: 'passwordResets',
    });
    User.belongsToMany(Group, {
      foreignKey: 'userId',
      as: 'groups',
      through: GroupMember,
    });
    User.belongsToMany(Forum, {
      foreignKey: 'managerId',
      as: 'managedForums',
      through: ForumManager,
      otherKey: 'forumId',
    });

    sequelizePaginate.paginate(User);
    return User;
  };
};
