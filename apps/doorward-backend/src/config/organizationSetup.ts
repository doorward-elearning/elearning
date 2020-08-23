import connectDatabase from '../utils/connectDatabase';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import * as fs from 'fs';
import * as path from 'path';
import { UserStatus } from '@doorward/common/types/users';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';
import RoleEntity from '@doorward/common/entities/role.entity';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
const chalk = require('chalk');

export let currentOrganization: OrganizationEntity = undefined;

export interface OrganizationConfig {
  id: string;
  name: string;
  link: string;
  icons: {
    dark: string;
    light: string;
  };
  description: string;
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

const parseOrganization = (): OrganizationConfig => {
  try {
    const filePath = path.join(__dirname, '../../../config/organization.json');
    const fileContents = fs.readFileSync(filePath).toString();
    return JSON.parse(fileContents) as OrganizationConfig;
  } catch (error) {
    console.error(error);
  }
};

const organizationSetup = async (): Promise<OrganizationEntity> => {
  const connectionManager = await connectDatabase();
  const connection = connectionManager.get();
  const queryRunner = connection.createQueryRunner();
  try {
    await queryRunner.startTransaction();

    const entityManager = queryRunner.manager;

    const organizationConfig = parseOrganization();
    const { id, link, name, icons, description, admins } = organizationConfig;
    if (!organizationConfig.id) {
      console.error('Organization id is required in the "organization.json" config file');
      process.exit(1);
    }
    let organization = entityManager.create(OrganizationEntity, {
      id,
      link,
      name,
      icon: icons?.light || '',
      darkThemeIcon: icons?.dark || '',
      description,
    });
    organization = await entityManager.save(OrganizationEntity, organization);

    const role = await entityManager.findOne(RoleEntity, {
      name: Roles.SUPER_ADMINISTRATOR,
    });

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

    console.log(chalk.cyan('Organization set up complete.'));

    currentOrganization = organization;

    //set it as an environment variable
    process.env.ORGANIZATION_ID = currentOrganization.id;

    return organization;
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
  }
};

export default organizationSetup;
