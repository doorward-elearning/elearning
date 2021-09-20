import parseOrganizationFile from '@doorward/backend/utils/parseOrganizationFile';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import OrganizationConfigEntity from '@doorward/common/entities/OrganizationConfigEntity';
import { OrganizationConfigKey } from '@doorward/common/types/organizationConfig';
import Tools from '@doorward/common/utils/Tools';
import createOrganizationsDbConnection from '@doorward/backend/utils/createOrganizationsDbConnection';

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

const organizationSetup = async (ormConfig: any) => {
  const connection = await createOrganizationsDbConnection(ormConfig);

  const queryRunner = connection.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganizationFile();

    const organization = entityManager.create(OrganizationEntity, {
      name: process.env.DEFAULT_ORGANIZATION_NAME,
      displayName: process.env.DEFAULT_ORGANIZATION_DISPLAY_NAME,
      databaseName: process.env.DEFAULT_ORGANIZATION_DATABASE_NAME,

      ...organizationConfig,

      id: process.env.DEFAULT_ORGANIZATION_ID,
      logo: organizationConfig.logos?.light,
      darkThemeLogo: organizationConfig.logos?.dark,
    });

    await entityManager.save(OrganizationEntity, organization);

    await connection
      .createQueryBuilder()
      .insert()
      .into(OrganizationConfigEntity)
      .values([
        {
          id: Tools.generateId(),
          key: OrganizationConfigKey.MEETING,
          value: JSON.stringify(parseMeetingConfig()),
          organization,
        },
        {
          id: Tools.generateId(),
          key: OrganizationConfigKey.MEETING_INTERFACE,
          value: JSON.stringify(parseMeetingInterfaceConfig()),
          organization,
        },
      ])
      .onConflict(`("key") DO NOTHING`)
      .execute();

    await queryRunner.commitTransaction();

    console.log(chalk.cyan('Root organization set up complete.'));
  } catch (e) {
    console.error(e);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export default organizationSetup;
