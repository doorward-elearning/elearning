import { DynamicModule, Global, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import organizationsEntities from '@doorward/backend/database/organizations.entities';
import { getConnection } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ORGANIZATION_CONNECTION } from '@doorward/backend/constants';
import repositories from '@doorward/backend/repositories';

@Global()
export class MultiOrganizationModule {
  static register(ormConfig: any): DynamicModule {
    return {
      module: MultiOrganizationModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...(ormConfig as any),
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
        ...repositories,
      ],
      exports: [ORGANIZATION_CONNECTION, ...repositories],
    };
  }
}
