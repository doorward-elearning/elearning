import parseOrganizationFile from '@doorward/backend/utils/parseOrganizationFile';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import OrganizationConfigEntity from '@doorward/common/entities/OrganizationConfigEntity';
import { OrganizationConfigKey } from '@doorward/common/types/organizationConfig';
import Tools from '@doorward/common/utils/Tools';
import createOrganizationsDbConnection from '@doorward/backend/utils/createOrganizationsDbConnection';
import { Connection } from 'typeorm';
import multiOrganizationSetup from './multiOrganizationSetup';
import { TaskStatus } from '@doorward/common/types/enums';

const getConfigFile = (fileName: string) => {
  const filePath = path.join(__dirname, './config', fileName);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  throw new Error('Config does not exist in path: ' + filePath);
};

const parseConfigFile = <T = object>(fileName: string): T => {
  try {
    const filePath = getConfigFile(fileName);
    const fileContents = fs.readFileSync(filePath).toString();

    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(error);
  }
};

export const parseMeetingConfig = () => {
  const base = parseConfigFile('meetings.config.json');
  const moderator = parseConfigFile('meetings.config.moderator.json');
  const publisher = parseConfigFile('meetings.config.publisher.json');
  const subscriber = parseConfigFile('meetings.config.subscriber.json');

  return {
    base,
    moderator,
    publisher,
    subscriber,
  };
};

export const parseMeetingInterfaceConfig = () => {
  const base = parseConfigFile('meetings.interface.json');
  const moderator = parseConfigFile('meetings.interface.moderator.json');
  const publisher = parseConfigFile('meetings.interface.publisher.json');
  const subscriber = parseConfigFile('meetings.interface.subscriber.json');

  return {
    base,
    moderator,
    publisher,
    subscriber,
  };
};

export const createDefaultOrganization = async (ormConfig: any) => {
  const connection = await createOrganizationsDbConnection(ormConfig);

  const organizationConfig = parseOrganizationFile();

  const queryRunner = connection.createQueryRunner();

  let organization = await queryRunner.manager.findOne(OrganizationEntity, process.env.DEFAULT_ORGANIZATION_ID);

  if (organization.rolesSetupStatus === TaskStatus.PENDING) {
    try {
      await queryRunner.startTransaction();

      const entityManager = queryRunner.manager;

      const createdOrganization = entityManager.create(OrganizationEntity, {
        name: process.env.DEFAULT_ORGANIZATION_NAME,
        displayName: process.env.DEFAULT_ORGANIZATION_DISPLAY_NAME,
        databaseName: process.env.DEFAULT_ORGANIZATION_DATABASE_NAME,

        ...organizationConfig,

        id: process.env.DEFAULT_ORGANIZATION_ID,
        logo: organizationConfig.logos?.light,
        darkThemeLogo: organizationConfig.logos?.dark,
      });

      await entityManager.save(OrganizationEntity, createdOrganization);

      organization = await queryRunner.manager.findOne(OrganizationEntity, process.env.DEFAULT_ORGANIZATION_ID);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  return organization;
};

const organizationConfigSetup = async (connection: Connection) => {
  try {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OrganizationConfigEntity)
      .values([
        {
          id: Tools.generateId(),
          key: OrganizationConfigKey.MEETING,
          value: JSON.stringify(parseMeetingConfig()),
        },
        {
          id: Tools.generateId(),
          key: OrganizationConfigKey.MEETING_INTERFACE,
          value: JSON.stringify(parseMeetingInterfaceConfig()),
        },
      ])
      .onConflict(`("key") DO NOTHING`)
      .execute();

    console.log(chalk.cyan('Organization[' + connection.name + '] config set up complete.'));
  } catch (e) {
    console.error(e);
  }
};

export const multiOrganizationConfigSetup = multiOrganizationSetup(organizationConfigSetup);

export default organizationConfigSetup;
