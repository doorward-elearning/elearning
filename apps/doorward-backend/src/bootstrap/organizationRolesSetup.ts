import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';
import RoleEntity from '@doorward/common/entities/role.entity';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';
import compareLists from '@doorward/common/utils/compareLists';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { Connection, In } from 'typeorm';
import parseOrganizationFile from '@doorward/backend/utils/parseOrganizationFile';
import multiOrganizationSetup from './multiOrganizationSetup';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { TaskStatus } from '@doorward/common/types/enums';

const chalk = require('chalk');

const organizationRolesSetup = async (connection: Connection, organization: OrganizationEntity) => {
  const organizationRepository = organization.getRepository(organization.getConnection(), OrganizationEntity);
  const queryRunner = connection.createQueryRunner();
  try {
    if (organization.rolesSetupStatus === TaskStatus.DONE) {
      await queryRunner.release();
      return;
    }

    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganizationFile();

    const { roles, admins } = organizationConfig;

    const privileges = await entityManager.query('SELECT name FROM "Privileges"');

    const privilegeNames = privileges.map((privilege) => privilege.name);

    // set up the role privileges
    await Promise.all(
      Object.keys(roles).map(async (role) => {
        const roleExists = await entityManager.findOne(RoleEntity, {
          where: {
            name: role.trim(),
          },
          relations: ['privileges'],
        });
        if (roleExists) {
          // get all existing privileges
          const existingPrivileges = roleExists.privileges.map((x) => x.name);
          const rolePrivileges = roles[role].privileges;
          const excludedPrivileges = roles[role].exclude;

          let newPrivileges = privilegeNames.filter(
            (privilege) =>
              rolePrivileges.find((_rolePrivilege) => wildcardPattern(privilege, _rolePrivilege)) &&
              !excludedPrivileges.find((_excluded) => wildcardPattern(privilege, _excluded))
          );

          const { newItems, unchanged } = compareLists(existingPrivileges, newPrivileges);

          newPrivileges = [...newItems, ...unchanged];

          if (newPrivileges.length) {
            roleExists.privileges = await entityManager.find(PrivilegeEntity, {
              where: {
                name: In(newPrivileges),
              },
            });
          } else {
            roleExists.privileges = [];
          }

          await entityManager.save(roleExists);
        } else {
          console.warn(role + ' does not exist.');
        }
      })
    );

    const role = await entityManager.findOne(RoleEntity, {
      name: Roles.SUPER_ADMINISTRATOR,
    });

    // update the roles
    await Promise.all(
      Object.keys(Roles).map(async (roleName) => {
        const role = await entityManager.findOne(RoleEntity, {
          name: roleName as Roles,
        });

        await entityManager.save(RoleEntity, role);
      })
    );

    if (!admins?.length) {
      console.error('Organization config file "organization.json" does not specify any admins');
      process.exit(1);
    }

    await Promise.all(
      admins.map(async (admin) => {
        let user = await entityManager.findOne(UserEntity, admin.id);
        user = entityManager.create(UserEntity, {
          ...admin,
          password: user ? user.password : PasswordUtils.hashPassword(admin.password),
          role,
        });
        await entityManager.save(UserEntity, user);
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
