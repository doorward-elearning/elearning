import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import ormConfig from '../ormconfig.js';
import EmailsModule from '@doorward/backend/modules/emails/emails.module';
import path from 'path';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';
import { MultiOrganizationModule } from '@doorward/backend/modules/multi-organization/multi.organization.module';
import { AuthModule } from './modules/auth/auth.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { SearchSuggestionsModule } from './modules/search-suggestions/search-suggestions.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { StudentsModule } from './modules/students/students.module';
import { JitsiModule } from './modules/jitsi/jitsi.module';
import { MeetingRoomsModule } from './modules/meeting-rooms/meeting-rooms.module';
import { ItemsModule } from './modules/courses/modules/items/items.module';
import { ReportsModule } from './modules/reports/reports.module';
import { CoursesModule } from './modules/courses/courses.module';
import { FilesModule } from './modules/files/files.module';
import { ModulesModule } from './modules/courses/modules/modules.module';
import { GroupsModule } from '@doorward/backend/modules/groups/groups.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { MeetingsModule } from './modules/meetings/meetings.module';

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
    UsersModule,
    RolesModule,
    CoursesModule,
    ModulesModule,
    ItemsModule,
    StudentsModule,
    MeetingRoomsModule,
    GroupsModule,
    JitsiModule,
    MeetingsModule,
    ReportsModule,
    SchoolsModule,
    FilesModule,
    SearchSuggestionsModule,
    TeachersModule,
    ResourcesModule,
  ],
  controllers: [HealthCheckController],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): any {}
}
