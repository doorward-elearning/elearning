import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ModulesModule } from './modules/courses/modules/modules.module';
import { ItemsModule } from './modules/courses/modules/items/items.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { StudentsModule } from './modules/students/students.module';
import ormConfig from '../ormconfig.js';
import EmailsModule from '@doorward/backend/modules/emails/emails.module';
import path from 'path';
import entities from './database/entities';
import { ORGANIZATION } from './bootstrap/organizationSetup';
import { MeetingRoomsModule } from './modules/meeting-rooms/meeting-rooms.module';
import { LoggerModule } from 'nestjs-pino/dist';
import { GroupsModule } from './modules/groups/groups.module';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { JitsiModule } from './modules/jitsi/jitsi.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { FilesModule } from './modules/files/files.module';
import { SearchSuggestionsModule } from './modules/search-suggestions/search-suggestions.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ResourcesModule } from './modules/resources/resources.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ormConfig,
        entities,
      }),
    }),
    EmailsModule.register({
      sendGrid: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      templatesDir: path.join(__dirname, 'emails/templates'),
      senderEmail: () => process.env.EMAIL_SENDER,
      sender: () => `${ORGANIZATION.name + (ORGANIZATION.name === 'Doorward' ? '' : ' - Doorward')}`,
      getData: () => ({ ORGANIZATION }),
    }),
    TypeOrmModule.forFeature(entities),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        autoLogging: process.env.NODE_ENV === 'production',
        prettyPrint: false,
        useLevelLabels: true,
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CoursesModule,
    ModulesModule,
    ItemsModule,
    OrganizationsModule,
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
  providers: [],
})
export class AppModule {
  constructor() {}
}
