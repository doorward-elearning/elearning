import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import GroupEntity from '@doorward/common/entities/group.entity';
import { GroupsService } from './groups.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import Privileges from '../../decorators/privileges.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { CreateGroupBody } from '@doorward/common/dtos/body/groups.body';
import { GroupResponse, SimpleGroupResponse } from '@doorward/common/dtos/response';

const GroupExists = () =>
  ModelExists({
    key: 'groupId',
    model: GroupEntity,
    message: 'Group does not exist.',
  });

@Controller('groups')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Post()
  @Privileges('groups.create')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The group that was created',
    type: GroupResponse,
  })
  async createGroup(@Body() body: CreateGroupBody, @CurrentUser() currentUser: UserEntity): Promise<GroupResponse> {
    const group = await this.groupService.createGroup(body, currentUser);

    return { group: new SimpleGroupResponse(group) };
  }
}
