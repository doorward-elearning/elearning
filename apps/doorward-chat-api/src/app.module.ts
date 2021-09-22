import { Global, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@doorward/common/entities';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import ormConfig from '../ormconfig.js';
import { ChatModule } from './modules/chat/chat.module';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';
import DoorwardDbLogger from '@doorward/backend/modules/logging/doorward.db.logger';
import { APP_GUARD } from '@nestjs/core';
import ModelExistsGuard from '@doorward/backend/guards/model.exists.guard';

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
    TypeOrmModule.forFeature(entities),
    ConversationsModule,
    ContactsModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ModelExistsGuard,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {
  constructor() {}
}
