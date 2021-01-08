import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@doorward/common/entities';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import ormConfig from '../ormconfig.js';
import { BaseAuthModule } from '@doorward/backend/modules/base-auth/base.auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';
import DoorwardDbLogger from '@doorward/backend/modules/logging/doorward.db.logger';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...(ormConfig as any),
        entities,
        logger: new DoorwardDbLogger(),
      }),
    }),
    DoorwardLoggerModule,
    BaseAuthModule,
    TypeOrmModule.forFeature(entities),
    ConversationsModule,
    ContactsModule,
    ChatModule,
  ],
})
export class AppModule {
  constructor() {}
}
