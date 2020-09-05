import * as path from 'path';
import * as fs from 'fs';
import connectDatabase from '../utils/connectDatabase';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import RoleEntity from '@doorward/common/entities/role.entity';
import compareLists from '@doorward/common/utils/compareLists';
import { In } from 'typeorm';
const chalk = require('chalk').default;

export interface RolesConfig {
  privileges: {
    [base: string]: Array<string | { name: string; description: string }>;
  };
  roles: {
    [role: string]: {
      privileges: Array<string>;
      exclude: Array<string>;
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
    const { privileges: rawPrivileges, roles } = parseRoles();
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;
    console.log(rawPrivileges);

    const privileges: Array<{ name: string; description: string }> = Object.keys(rawPrivileges).reduce((acc, cur) => {
      const generated = rawPrivileges[cur].map((_privilege) => {
        const name = (typeof _privilege === 'string' ? _privilege : _privilege.name).toLowerCase().trim();
        const description = typeof _privilege === 'string' ? '' : _privilege.description;

        return { name: cur.toLowerCase() + '-' + name, description };
      });
      return [...acc, ...generated];
    }, []);
    const privilegeNames = privileges.map((privilege) => privilege.name);

    // create all the privileges if they do not exist.
    await Promise.all(
      privileges.map(async ({ name, description }) => {
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
          const rolePrivileges = roles[role].privileges;
          const excludedPrivileges = roles[role].exclude;

          let newPrivileges = privilegeNames.filter(
            (privilege) =>
              rolePrivileges.find((_rolePrivilege) => new RegExp(_rolePrivilege, 'ig').test(privilege)) &&
              !excludedPrivileges.find((_excluded) => new RegExp(_excluded, 'ig').test(privilege))
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

export default rolesSetup;
