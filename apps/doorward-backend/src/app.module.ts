import { Global, MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import EmailsModule from '@doorward/backend/modules/emails/emails.module';
import path from 'path';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';
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
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { MultiOrganizationModule } from '@doorward/backend/modules/multi-organization/multi.organization.module';
import orgOrmConfig from '../ormconfig-organizations';
import ormConfig from '../ormconfig';
import { APP_GUARD } from '@nestjs/core';
import ModelExistsGuard from '@doorward/backend/guards/model.exists.guard';
import { BaseAuthModule } from '@doorward/backend/modules/base-auth/base-auth.module';

@Global()
@Module({
  imports: [
    MultiOrganizationModule.register(ormConfig, orgOrmConfig),
    EmailsModule.register({
      sendGrid: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      templatesDir: path.join(__dirname, 'templates'),
      senderEmail: () => process.env.EMAIL_SENDER,
      sender: (organization) => `${organization.name + (organization.name === 'Doorward' ? '' : ' - Doorward')}`,
      getData: () => ({}),
    }),
    BaseAuthModule,
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
    OrganizationsModule,
  ],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ModelExistsGuard,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule implements NestModule {
  constructor() {
  }

  configure(consumer: MiddlewareConsumer): any {

  }
}
