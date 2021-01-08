import OrganizationEntity from '@doorward/common/entities/organization.entity';
import * as fs from 'fs';
import * as path from 'path';
import { UserStatus } from '@doorward/common/types/users';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';
import RoleEntity from '@doorward/common/entities/role.entity';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import { OrganizationModels } from '@doorward/common/types/organization.models';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import connectDatabase from '@doorward/backend/database/connectDatabase';

const chalk = require('chalk');

export let ORGANIZATION: OrganizationEntity = undefined;

export interface OrganizationConfig {
  id: string;
  name: string;
  link: string;
  descriptiveLogo: boolean;
  icons: {
    dark: string;
    light: string;
  };
  description: string;
  customerType: CustomerTypes;
  meetingPlatform: MeetingPlatform;
  models: Record<OrganizationModels, string[2]>;
  admins: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    zipCode: string;
    country: string;
    city: string;
    status: UserStatus;
  }>;
}

const getConfigFile = (fileName: string, organization = process.env.ORGANIZATION) => {
  const filePath = path.join(__dirname, './config', organization || 'default', fileName);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  throw new Error('Config does not exist in path: ' + filePath);
};

const parseConfigFile = <T = object>(fileName: string): T => {
  try {
    let filePath;
    try {
      filePath = getConfigFile(fileName);
    } catch (e) {
      console.error(e);
      filePath = getConfigFile(fileName, 'default');
    }
    const fileContents = fs.readFileSync(filePath).toString();

    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(error);
  }
};

const parseOrganization = (): OrganizationConfig => {
  return parseConfigFile('organization.json');
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

const organizationSetup = async (entities: Array<any>, ormConfig: any): Promise<OrganizationEntity> => {
  const connectionManager = await connectDatabase(entities, ormConfig);
  const connection = connectionManager.get();
  const queryRunner = connection.createQueryRunner();
  let organization = null;
  try {
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganization();
    const {
      id,
      link,
      name,
      icons,
      description,
      admins,
      models,
      descriptiveLogo,
      customerType,
      meetingPlatform,
    } = organizationConfig;
    if (!organizationConfig.id) {
      console.error('Organization id is required in the "organization.json" config file');
      process.exit(1);
    }
    organization = entityManager.create(OrganizationEntity, {
      id,
      link,
      name,
      descriptiveLogo,
      icon: icons?.light || '',
      darkThemeIcon: icons?.dark || '',
      description,
      customerType,
      meetingPlatform,
    });
    organization = await entityManager.save(OrganizationEntity, organization);

    const role = await entityManager.findOne(RoleEntity, {
      name: Roles.SUPER_ADMINISTRATOR,
    });

    // update the roles
    await Promise.all(
      Object.keys(Roles).map(async (roleName) => {
        const role = await entityManager.findOne(RoleEntity, {
          name: roleName as Roles,
        });

        role.displayName = models[roleName as Roles] || role.displayName;
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
          organization,
          role,
        });
        await entityManager.save(UserEntity, user);
      })
    );

    await queryRunner.commitTransaction();

    organization.models = Object.keys(models).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: models[cur][0],
        [cur + '_plural']: models[cur][1],
      };
    }, {} as any);

    organization.meetings = {
      config: parseMeetingConfig(),
      interface: parseMeetingInterfaceConfig(),
    };

    console.log(chalk.cyan('Organization set up complete.'));

    ORGANIZATION = organization;

    //set it as an environment variable
    process.env.ORGANIZATION_ID = ORGANIZATION.id;
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
  }
  return organization;
};

export default organizationSetup;
