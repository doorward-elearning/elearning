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

const organizationRolesSetup = async (
  connection: Connection,
  organization: OrganizationEntity,
  orgConnection: Connection
) => {
  const organizationRepository = orgConnection.getRepository(OrganizationEntity);
  const queryRunner = connection.createQueryRunner();
  try {
    if (organization.rolesSetupStatus === TaskStatus.DONE) {
      await queryRunner.release();
      return;
    }

    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganizationFile(ORGANIZATION_FILE_NAME);

    const { roles, users } = organizationConfig;

    const privileges = await entityManager.query('SELECT name FROM "Privileges"');

    const privilegeNames = privileges.map((privilege) => privilege.name);

    const rolesToCreate = [];
    // set up the role privileges
    await Promise.all(
      Object.keys(roles).map(async (role) => {
        if (roles[role].rootOrganizationOnly && !organization.root) {
          return;
        }

        const createdRole = await entityManager.create(RoleEntity, {
          name: role.trim(),
          displayName: roles[role].displayName,
          description: roles[role].description,
        });
        const rolePrivileges = roles[role].privileges;
        const excludedPrivileges = roles[role].exclude;

        const newPrivileges = privilegeNames.filter(
          (privilege) =>
            rolePrivileges.find((_rolePrivilege) => wildcardPattern(privilege, _rolePrivilege)) &&
            !excludedPrivileges.find((_excluded) => wildcardPattern(privilege, _excluded))
        );

        if (newPrivileges.length) {
          createdRole.privileges = entityManager.find(PrivilegeEntity, {
            where: {
              name: In(newPrivileges),
            },
          });
        } else {
          createdRole.privileges = new Promise((resolve) => resolve([]));
        }

        rolesToCreate.push(createdRole);
      })
    );

    await connection
      .createQueryBuilder()
      .useTransaction(true)
      .insert()
      .into(RoleEntity)
      .values(rolesToCreate)
      .onConflict(`("name") DO NOTHING`)
      .execute();

    if (!users?.length) {
      console.error('Organization config file "' + ORGANIZATION_FILE_NAME + '" does not specify any users');
      process.exit(1);
    }

    await Promise.all(
      users.map(async (user) => {
        const role = await entityManager.findOne(RoleEntity, {
          where: { name: user.role.trim() },
        });
        const createdUser = entityManager.create(UserEntity, {
          ...user,
          password: user ? user.password : PasswordUtils.hashPassword(user.password),
          role,
        });
        await entityManager.save(UserEntity, createdUser);
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

export default multiOrganizationSetup(organizationRolesSetup);
