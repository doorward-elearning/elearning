import { DynamicModule, Global, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import organizationsEntities from '@doorward/backend/database/organizations.entities';
import { getConnection } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import {
  MAIN_CONNECTION_OPTIONS,
  ORGANIZATION_CONNECTION,
  ORGANIZATIONS_CONNECTION_OPTIONS,
} from '@doorward/backend/constants';
import repositories from '@doorward/backend/repositories';

@Global()
export class MultiOrganizationModule {
  static register(ormConfig: any, organizationOrmConfig: any): DynamicModule {
    return {
      module: MultiOrganizationModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...(organizationOrmConfig as any),
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
        { provide: MAIN_CONNECTION_OPTIONS, useValue: ormConfig },
        { provide: ORGANIZATIONS_CONNECTION_OPTIONS, useValue: organizationOrmConfig },
        ...repositories,
      ],
      exports: [ORGANIZATION_CONNECTION, MAIN_CONNECTION_OPTIONS, ORGANIZATIONS_CONNECTION_OPTIONS, ...repositories],
    };
  }
}
