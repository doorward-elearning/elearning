import * as path from 'path';
import * as fs from 'fs';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { Connection } from 'typeorm';
import multiOrganizationSetup from './multiOrganizationSetup';
import chalk from 'chalk';

export interface PrivilegesConfig {
  delimiter: string;
  privileges: {
    [base: string]: Array<string | { name: string; description: string }>;
  };
}

const getOrganizationRolesFile = () => {
  const filePath = path.join(__dirname, './config', 'privileges.json');
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  throw new Error('Privileges config does not exist in path: ' + filePath);
};

const parseRoles = (): PrivilegesConfig => {
  try {
    const filePath = getOrganizationRolesFile();
    const fileContents = fs.readFileSync(filePath).toString();
    return JSON.parse(fileContents) as PrivilegesConfig;
  } catch (error) {
    console.error(error);
  }
};

export const privilegesSetup = async (connection: Connection): Promise<void> => {
  const queryRunner = connection.createQueryRunner();
  try {
    console.log(chalk.cyan(`Org[${connection.name}]: Privileges set up started.`));

    const { privileges: rawPrivileges, delimiter } = parseRoles();
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const privileges: Array<{ name: string; description: string }> = Object.keys(rawPrivileges).reduce((acc, cur) => {
      const generated = rawPrivileges[cur].map((_privilege) => {
        const name = (typeof _privilege === 'string' ? _privilege : _privilege.name).trim();
        const description = typeof _privilege === 'string' ? '' : _privilege.description;

        return { name: cur + delimiter + name, description };
      });
      return [...acc, ...generated];
    }, []);

    const privilegeEntities = [];

    // create all the privileges if they do not exist.
    await Promise.all(
      privileges.map(async ({ name, description }) => {
        const exists = await entityManager.findOne(PrivilegeEntity, {
          where: {
            name,
          },
        });

        if (!exists) {
          privilegeEntities.push(
            entityManager.create(PrivilegeEntity, {
              name,
              description,
            })
          );
        }
      })
    );
    await entityManager.save(privilegeEntities, {
      transaction: false,
    });

    await queryRunner.commitTransaction();

    console.log(chalk.cyan(`Org[${connection.name}]: Privileges set up complete.`));
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export const multiOrganizationPrivilegesSetup = multiOrganizationSetup(privilegesSetup);
