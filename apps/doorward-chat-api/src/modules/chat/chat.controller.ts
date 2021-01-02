import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import Privileges from '../../../../doorward-backend/src/decorators/privileges.decorator';
import { ChatService } from './chat.service';
import { ConversationsResponse } from '@doorward/common/dtos/response';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';

@Controller('chat')
@ApiTags('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('conversations')
  @Privileges('chat.*')
  async getConversations(@CurrentUser() currentUser: UserEntity): Promise<ConversationsResponse> {
    const conversations = await this.chatService.getConversations(currentUser);

    return {
      conversations,
    };
  }
}
