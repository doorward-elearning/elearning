import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../ormconfig';
import organizationsEntities from '@doorward/backend/database/organizations.entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...(ormConfig as any),
        entities: organizationsEntities,
      }),
    }),
    OrganizationsModule,
    DoorwardLoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
