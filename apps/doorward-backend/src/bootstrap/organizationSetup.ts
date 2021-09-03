import * as fs from 'fs';
import * as path from 'path';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';
import RoleEntity from '@doorward/common/entities/role.entity';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import connectDatabase from '@doorward/backend/database/connectDatabase';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';
import compareLists from '@doorward/common/utils/compareLists';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { In } from 'typeorm';
import parseOrganizationFile from '@doorward/backend/utils/parseOrganizationFile';

const chalk = require('chalk');


const organizationSetup = async (entities: Array<any>, ormConfig: any) => {
  const connectionManager = await connectDatabase(entities, ormConfig);
  const connection = connectionManager.get();
  const queryRunner = connection.createQueryRunner();
  try {
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

    console.log(chalk.cyan('Organization roles and admins set up complete.'));
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
  }
};

export default organizationSetup;
