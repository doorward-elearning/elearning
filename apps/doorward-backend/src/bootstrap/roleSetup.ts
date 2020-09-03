import * as path from 'path';
import * as fs from 'fs';
import connectDatabase from '../utils/connectDatabase';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import RoleEntity from '@doorward/common/entities/role.entity';
import compareLists from '@doorward/common/utils/compareLists';
import { In } from 'typeorm';
const chalk = require('chalk').default;

export interface RolesConfig {
  privileges: Array<string | { name: string; description: string }>;
  roles: {
    [role: string]: {
      privileges: string | Array<string>;
    };
  };
}

const parseRoles = (): RolesConfig => {
  try {
    const filePath = path.join(__dirname, './config/roles.json');
    const fileContents = fs.readFileSync(filePath).toString();
    return JSON.parse(fileContents) as RolesConfig;
  } catch (error) {
    console.error(error);
  }
};

const rolesSetup = async (): Promise<void> => {
  const connectionManager = await connectDatabase();
  const connection = connectionManager.get();
  const queryRunner = connection.createQueryRunner();
  try {
    const { privileges, roles } = parseRoles();
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const privilegeNames = privileges.map((privilege) =>
      (typeof privilege === 'string' ? privilege : privilege.name).toLowerCase().trim()
    );

    // create all the privileges if they do not exist.
    await Promise.all(
      privileges.map(async (_privilege) => {
        const name = (typeof _privilege === 'string' ? _privilege : _privilege.name).toLowerCase().trim();
        const description = typeof _privilege === 'string' ? '' : _privilege.description;

        const exists = await entityManager.findOne(PrivilegeEntity, {
          where: {
            name,
          },
        });

        if (!exists) {
          await entityManager.save(
            PrivilegeEntity,
            entityManager.create(PrivilegeEntity, {
              name,
              description,
            })
          );
        }
      })
    );

    // set up the role privileges
    await Promise.all(
      Object.keys(roles).map(async (role) => {
        const roleExists = await entityManager.findOne(RoleEntity, {
          where: {
            name: role.trim(),
          },
        });
        if (roleExists) {
          // get all existing privileges
          const existingPrivileges = (await roleExists.privileges).map((x) => x.name);
          let newPrivileges = [];

          if (typeof roles[role].privileges === 'string') {
            if (roles[role].privileges === '*') {
              newPrivileges = privilegeNames;
            } else {
              newPrivileges = [roles[role].privileges];
            }
          } else {
            newPrivileges = roles[role].privileges as Array<string>;
          }

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

    await queryRunner.commitTransaction();

    console.log(chalk.cyan('Roles set up complete.'));
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
  }
};

rolesSetup();

export default rolesSetup;
