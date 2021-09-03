import * as path from 'path';
import * as fs from 'fs';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import connectDatabase from '@doorward/backend/database/connectDatabase';

const chalk = require('chalk').default;

export interface RolesConfig {
  delimiter: string;
  privileges: {
    [base: string]: Array<string | { name: string; description: string }>;
  };
}

const getOrganizationRolesFile = () => {
  const filePath = path.join(__dirname, './config', 'roles.json');
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  throw new Error('Roles config does not exist in path: ' + filePath);
};

const parseRoles = (): RolesConfig => {
  try {
    const filePath = getOrganizationRolesFile();
    const fileContents = fs.readFileSync(filePath).toString();
    return JSON.parse(fileContents) as RolesConfig;
  } catch (error) {
    console.error(error);
  }
};

const rolesSetup = async (entities: Array<any>, ormConfig: any): Promise<void> => {
  const connection = await connectDatabase(entities, {
    ...ormConfig,
    migrationsRun: false,
  });
  const queryRunner = connection.createQueryRunner();
  try {
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

    console.log(chalk.cyan('Roles set up complete.'));
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export default rolesSetup;
