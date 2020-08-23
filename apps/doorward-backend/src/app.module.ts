import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { RolesModule } from './modules/roles/roles.module';
import ormConfig from '../ormconfig.js';
import EmailsModule from '@doorward/backend/modules/emails/emails.module';
import path from 'path';
import entities from '@doorward/common/entities';

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
      senderEmail: process.env.EMAIL_SENDER,
      sender: 'Doorward',
      appName: 'Doorward',
      appLogo: 'https://res.cloudinary.com/dldhztrbs/image/upload/v1594532831/Doorward/doorward_logo_blue.png',
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
