import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { RolesModule } from './modules/roles/roles.module';
import ormConfig from '../ormconfig.js';
import entities from './database/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ormConfig,
        entities,
      }),
    }),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    UsersModule,
    OrganizationModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
