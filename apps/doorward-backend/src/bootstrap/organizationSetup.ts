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
import wildcardPattern from '@doorward/common/utils/wildcardPattern';
import compareLists from '@doorward/common/utils/compareLists';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { In } from 'typeorm';

const chalk = require('chalk');

export const ORGANIZATIONS: Record<string, OrganizationEntity> = {};

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
  roles: {
    [role: string]: {
      privileges: Array<string>;
      exclude: Array<string>;
    };
  };
}

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
    const { link, name, icons, description, admins, descriptiveLogo, customerType, meetingPlatform, roles } =
      organizationConfig;

    organization = entityManager.create(OrganizationEntity, {
      id: process.env.DEFAULT_ORGANIZATION_ID,
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
          const existingPrivileges = (await roleExists.privileges).map((x) => x.name);
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
          organization,
          role,
        });
        await entityManager.save(UserEntity, user);
      })
    );

    await queryRunner.commitTransaction();

    const organizations = await entityManager.find(OrganizationEntity);

    organizations.forEach((organization) => {
      organization.meetings = {
        config: parseMeetingConfig(),
        interface: parseMeetingInterfaceConfig(),
      };

      ORGANIZATIONS[organization.id] = organization;
    });

    console.log(chalk.cyan('Organization set up complete.'));
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
