import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('conversations')
@ApiTags('conversations')
export class ConversationsController {}
