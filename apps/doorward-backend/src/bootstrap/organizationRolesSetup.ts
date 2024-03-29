import UserEntity from '@doorward/common/entities/user.entity';
import RoleEntity from '@doorward/common/entities/role.entity';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { Connection, In } from 'typeorm';
import parseOrganizationFile from '@doorward/backend/utils/parseOrganizationFile';
import multiOrganizationSetup from './multiOrganizationSetup';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { TaskStatus } from '@doorward/common/types/enums';

const chalk = require('chalk');

const ORGANIZATION_FILE_NAME = 'organization.yaml';

export const organizationRolesSetup = async (
  connection: Connection,
  organization: OrganizationEntity,
  orgConnection: Connection
) => {
  const organizationRepository = orgConnection.getRepository(OrganizationEntity);

  const queryRunner = connection.createQueryRunner();
  try {
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganizationFile(ORGANIZATION_FILE_NAME);

    const { roles, users } = organizationConfig;

    const privileges = await entityManager.query('SELECT name FROM "Privileges"');

    const privilegeNames = privileges.map((privilege) => privilege.name);

    // set up the role privileges
    await Promise.all(
      Object.keys(roles).map(async (role) => {
        if (roles[role].rootOrganizationOnly && !organization.root) {
          return;
        }

        const existingRole = await entityManager.findOne(RoleEntity, {
          where: {
            name: role.trim(),
          },
        });

        const createdRole = await entityManager.create(RoleEntity, {
          id: existingRole?.id,
          name: role.trim(),
          displayName: roles[role].displayName,
          description: roles[role].description,
        });
        const rolePrivileges = roles[role].privileges;
        const excludedPrivileges = roles[role].exclude;

        const newPrivileges = privilegeNames.filter(
          (privilege) =>
            rolePrivileges.find((_rolePrivilege) => wildcardPattern(privilege, _rolePrivilege)) &&
            !excludedPrivileges?.find((_excluded) => wildcardPattern(privilege, _excluded))
        );

        if (newPrivileges.length) {
          createdRole.privileges = await entityManager.find(PrivilegeEntity, {
            where: {
              name: In(newPrivileges),
            },
          });
        } else {
          createdRole.privileges = [];
        }

        await entityManager.save(createdRole);
      })
    );

    if (!users?.length) {
      console.error('Organization config file "' + ORGANIZATION_FILE_NAME + '" does not specify any users');
      process.exit(1);
    }

    await Promise.all(
      users.map(async (user) => {
        if (!user.rootOrganizationOnly || organization.root) {
          const role = await entityManager.findOne(RoleEntity, {
            where: { name: user.role.trim() },
          });
          const existingUser = await entityManager.findOne(UserEntity, { where: { username: user.username } });

          const createdUser = entityManager.create(UserEntity, {
            ...user,
            ...(existingUser || {}),
            password: existingUser?.password || PasswordUtils.hashPassword(user.password),
            role,
          });
          await entityManager.save(UserEntity, createdUser);
        }
      })
    );

    await queryRunner.commitTransaction();

    // Update that the role set-up is complete
    await organizationRepository.update(organization.id, { rolesSetupStatus: TaskStatus.DONE });

    console.log(chalk.cyan(`Org[${connection.name}] roles and admins set up complete.`));
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export const multiOrganizationRolesSetup = multiOrganizationSetup(organizationRolesSetup);
