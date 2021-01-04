import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@doorward/common/entities';
import { LoggerModule } from 'nestjs-pino/dist';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import ormConfig from '../ormconfig.js';
import { BaseAuthModule } from '@doorward/backend/modules/base-auth/base.auth.module';
import { ChatModule } from './modules/chat/chat.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ormConfig as any,
        entities,
      }),
    }),
    BaseAuthModule,
    TypeOrmModule.forFeature(entities),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        autoLogging: process.env.NODE_ENV === 'production',
        prettyPrint: false,
        useLevelLabels: true,
      },
    }),
    ConversationsModule,
    ContactsModule,
    ChatModule,
  ],
})
export class AppModule {
  constructor() {}
}