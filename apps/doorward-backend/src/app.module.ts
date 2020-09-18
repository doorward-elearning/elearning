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
import generateEmailData from './bootstrap/generateEmailData';
import { ORGANIZATION } from './bootstrap/organizationSetup';
import { MeetingRoomsModule } from './modules/meeting-rooms/meeting-rooms.module';

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
      templatesDir: path.join(__dirname, 'emails'),
      senderEmail: () => process.env.EMAIL_SENDER,
      sender: () => `${ORGANIZATION.name + ' - Doorward'}`,
      getData: generateEmailData,
    }),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    UsersModule,
    RolesModule,
    CoursesModule,
    ModulesModule,
    ItemsModule,
    OrganizationsModule,
    StudentsModule,
    MeetingRoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
