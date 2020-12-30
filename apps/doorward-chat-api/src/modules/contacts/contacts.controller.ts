import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import { ContactsResponse } from '@doorward/common/dtos/response/chat.responses';
import { ContactsService } from './contacts.service';
import Privileges from '../../../../doorward-backend/src/decorators/privileges.decorator';

@Controller('contacts')
@ApiTags('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get('all')
  @Privileges('chat.*')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContactsResponse,
    description: 'A list of contacts to chat with',
  })
  @ApiBearerAuth()
  async getContacts(): Promise<ContactsResponse> {
    const contacts = await this.contactsService.getContacts();

    return {
      contacts,
    };
  }
}
