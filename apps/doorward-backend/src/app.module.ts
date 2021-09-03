import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import ormConfig from '../ormconfig.js';
import EmailsModule from '@doorward/backend/modules/emails/emails.module';
import path from 'path';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';
import { MultiOrganizationModule } from '@doorward/backend/modules/multi-organization/multi.organization.module';
import { AuthModule } from './modules/auth/auth.module';

@Global()
@Module({
  imports: [
    MultiOrganizationModule.register(ormConfig),
    EmailsModule.register({
      sendGrid: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      templatesDir: path.join(__dirname, 'emails/templates'),
      senderEmail: () => process.env.EMAIL_SENDER,
      sender: (organization) => `${organization.name + (organization.name === 'Doorward' ? '' : ' - Doorward')}`,
      getData: () => ({}),
    }),
    DoorwardLoggerModule,
    AuthModule,
    // UsersModule,
    // RolesModule,
    // CoursesModule,
    // ModulesModule,
    // ItemsModule,
    // StudentsModule,
    // MeetingRoomsModule,
    // GroupsModule,
    // JitsiModule,
    // MeetingsModule,
    // ReportsModule,
    // SchoolsModule,
    // FilesModule,
    // SearchSuggestionsModule,
    // TeachersModule,
    // ResourcesModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): any {}
}
