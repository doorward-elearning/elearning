import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ModulesModule } from './modules/courses/modules/modules.module';
import { ItemsModule } from './modules/courses/modules/items/items.module';
import { StudentsModule } from './modules/students/students.module';
import ormConfig from '../ormconfig.js';
import EmailsModule from '@doorward/backend/modules/emails/emails.module';
import path from 'path';
import entities from '@doorward/common/entities';
import { MeetingRoomsModule } from './modules/meeting-rooms/meeting-rooms.module';
import { GroupsModule } from '@doorward/backend/modules/groups/groups.module';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { JitsiModule } from './modules/jitsi/jitsi.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { FilesModule } from './modules/files/files.module';
import { SearchSuggestionsModule } from './modules/search-suggestions/search-suggestions.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...(ormConfig as any),
        entities,
      }),
    }),
    EmailsModule.register({
      sendGrid: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      templatesDir: path.join(__dirname, 'emails/templates'),
      senderEmail: () => process.env.EMAIL_SENDER,
      sender: (organization) => `${organization.name + (organization.name === 'Doorward' ? '' : ' - Doorward')}`,
      getData: () => ({}),
    }),
    TypeOrmModule.forFeature(entities),
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
  providers: [],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): any {}
}
