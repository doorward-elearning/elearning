import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { getConnection } from 'typeorm';
import { ORGANIZATIONS_CONNECTION_NAME } from '@doorward/backend/utils/createOrganizationsDbConnection';
import connectDatabase from '@doorward/backend/database/connectDatabase';
import { BadRequestException } from '@nestjs/common';

export const ORGANIZATIONS: Record<string, OrganizationEntity> = {};

export const getOrganizationByHost = (origin: string) => {
  let currentOrganization;
  Object.values(ORGANIZATIONS).forEach((organization) => {
    if (
      organization.hosts.split(',').find((host) => {
        return origin.toLowerCase() === host.replace('http://', '').replace('https://', '');
      })
    ) {
      currentOrganization = organization;
    }
  });

  if (currentOrganization === null) {
    currentOrganization = ORGANIZATIONS[process.env.DEFAULT_ORGANIZATION_ID];
  }
  return currentOrganization;
};

export const organizationDetectorMiddleware = async (entities: Array<any>, ormConfig: any) => {
  const connection = getConnection(ORGANIZATIONS_CONNECTION_NAME);

  const organizations = await connection.manager.find(OrganizationEntity);

  organizations.forEach((organization) => {
    ORGANIZATIONS[organization.id] = organization;
  });

  return async (request: any, res: any, next: () => void): Promise<any> => {
    const hostUrl = request.protocol + '://' + request.get('host');
    const origin = (request.headers.origin || hostUrl || request.query?.origin || '')
      .trim()
      .replace('http://', '')
      .replace('https://', '');

    request.organization = getOrganizationByHost(origin);

    try {
      getConnection(request.organization.name);
      next();
    } catch (e) {
      const createdConnection = await connectDatabase(entities, ormConfig);

      if (createdConnection) {
        next();
      } else {
        throw new BadRequestException('Database connection error', 'There is an error with the database');
      }
    }
  };
};
