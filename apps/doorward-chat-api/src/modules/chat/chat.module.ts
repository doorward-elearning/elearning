import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import ChatGateway from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChatMessageRepository from '@doorward/backend/repositories/chat.message.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { ChatController } from './chat.controller';
import ConversationRepository from '@doorward/backend/repositories/conversation.repository';
import { GroupsModule } from '@doorward/backend/modules/groups/groups.module';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import ChatMessageActivityRepository from '@doorward/backend/repositories/chat.message.activity.repository';
import { DoorwardLoggerModule } from '@doorward/backend/modules/logging/doorward.logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatMessageRepository,
      UsersRepository,
      ConversationRepository,
      GroupsRepository,
      ChatMessageActivityRepository,
    ]),
    GroupsModule,
    DoorwardLoggerModule,
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
