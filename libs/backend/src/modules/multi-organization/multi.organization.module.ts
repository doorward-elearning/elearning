import { DynamicModule, Global, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORGANIZATIONS_CONNECTION_NAME } from '@doorward/backend/utils/createOrganizationsDbConnection';
import organizationsEntities from '@doorward/backend/database/organizations.entities';
import { Connection, getConnection } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { getOrganizationByHost } from '@doorward/backend/middleware/organization.detector.middleware';

export const ORGANIZATION_CONNECTION = 'ORGANIZATION_CONNECTION';

@Global()
export class MultiOrganizationModule {
  static register(ormConfig: any): DynamicModule {
    return {
      module: MultiOrganizationModule,
      imports: [
        TypeOrmModule.forRootAsync({
          name: ORGANIZATIONS_CONNECTION_NAME,
          useFactory: () => ({
            ...(ormConfig as any),
            name: ORGANIZATIONS_CONNECTION_NAME,
            database: process.env.ORGANIZATION_DATABASE,
            entities: organizationsEntities,
          }),
        }),
      ],
      providers: [
        {
          provide: ORGANIZATION_CONNECTION,
          inject: [REQUEST],
          scope: Scope.REQUEST,
          useFactory: async (request) => {
            return getConnection(request.organization.name);
          },
        },
      ],
      exports: [ORGANIZATION_CONNECTION],
    };
  }
}
