import connectDatabase from '@doorward/backend/database/connectDatabase';
import parseOrganizationFile from '@doorward/backend/utils/parseOrganizationFile';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

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

const parseMeetingConfig = () => {
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

const parseMeetingInterfaceConfig = () => {
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

const organizationSetup = async (entities: Array<any>, ormConfig: any) => {
  const connectionManager = await connectDatabase(entities, {
    ...ormConfig,
    migrationsRun: false,
  });
  const connection = connectionManager.get();

  const queryRunner = connection.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganizationFile();

    const organization = entityManager.create(OrganizationEntity, {
      ...organizationConfig,
      id: process.env.DEFAULT_ORGANIZATION_ID,
      logo: organizationConfig.logos?.light,
      darkThemeLogo: organizationConfig.logos?.dark,
    });

    await entityManager.save(OrganizationEntity, organization);



    await queryRunner.commitTransaction();

    console.log(chalk.cyan('Organization set up complete.'));
  } catch (e) {
    console.error(e);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
  }
};

export default organizationSetup;
