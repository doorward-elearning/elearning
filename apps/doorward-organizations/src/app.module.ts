import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';

@Global()
@Module({
  imports: [OrganizationsModule, DoorwardLoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
