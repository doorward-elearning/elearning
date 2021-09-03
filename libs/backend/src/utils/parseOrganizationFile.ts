import path from 'path';
import fs from 'fs';
import yaml from 'yaml';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { UserStatus } from '@doorward/common/types/users';

export interface OrganizationConfig {
  name: string;
  displayName: string;
  hosts: string;
  descriptiveLogo: boolean;
  logos: {
    dark: string;
    light: string;
  };
  description: string;
  customerType: CustomerTypes;
  meetingPlatform: MeetingPlatform;
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

const parseOrganizationFile = (fileName = 'organization.yaml'): OrganizationConfig => {
  const filePath = getConfigFile(fileName);
  try {
    const fileContents = fs.readFileSync(filePath).toString();

    return yaml.parse(fileContents)?.organization;
  } catch (e) {
    console.error('Error parsing organization file: ' + filePath);
  }
};

export default parseOrganizationFile;
