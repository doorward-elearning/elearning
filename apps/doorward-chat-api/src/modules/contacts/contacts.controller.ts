import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import { ContactsResponse } from '@doorward/common/dtos/response/chat.responses';
import { ContactsService } from './contacts.service';
import Privileges from '../../../../doorward-backend/src/decorators/privileges.decorator';
import { GroupsService } from '@doorward/backend/modules/groups/groups.service';
import { GroupsResponse, SimpleGroupResponse } from '@doorward/common/dtos/response';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';

@Controller('contacts')
@ApiTags('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private contactsService: ContactsService, private groupsService: GroupsService) {}

  @Get()
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

  @Get('/groups')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContactsResponse,
    description: 'A list of group contacts to chat with',
  })
  @Privileges('chat.createGroupChat')
  @ApiBearerAuth()
  async getGroupContacts(@CurrentUser() user: UserEntity): Promise<GroupsResponse> {
    const groups = [];

    if (await user.hasPrivileges('student.groups.view')) {
      groups.push(...(await this.groupsService.getGroups('Student')));
    }
    if (await user.hasPrivileges('teacher.groups.view')) {
      groups.push(...(await this.groupsService.getGroups('Teacher')));
    }
    groups.push(...(await this.groupsService.getGroupsWithUser(user.id)));

    return {
      groups: groups.map((group) => new SimpleGroupResponse(group)),
    };
  }
}
