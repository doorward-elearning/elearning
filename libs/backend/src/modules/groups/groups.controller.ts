import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../../apps/doorward-backend/src/guards/privileges.guard';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import GroupEntity from '@doorward/common/entities/group.entity';
import { GroupsService } from './groups.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import Privileges from '../../../../../apps/doorward-backend/src/decorators/privileges.decorator';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddMemberToGroupBody, CreateGroupBody } from '@doorward/common/dtos/body/groups.body';
import { GroupResponse, GroupsResponse, SimpleGroupResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';

const GroupExists = () => ModelExists({ key: 'groupId', model: GroupEntity, message: translate('groupDoesNotExist') });

@Controller('groups')
@ApiTags('groups')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  /**
   *
   * @param type
   * @param search
   */
  @Get()
  @Privileges('groups.view')
  @ApiResponse({ status: HttpStatus.OK, description: 'The list of groups', type: GroupsResponse })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getGroups(@Query('type') type: string, @Query('search') search: string): Promise<GroupsResponse> {
    const groups = await this.groupService.getGroups(type, search);

    return { groups: groups.map((group) => new SimpleGroupResponse(group)) };
  }

  /**
   *
   * @param body
   * @param currentUser
   */
  @Post()
  @Privileges('groups.create')
  @ApiResponse({ status: HttpStatus.OK, description: 'The group that was created', type: GroupResponse })
  async createGroup(@Body() body: CreateGroupBody, @CurrentUser() currentUser: UserEntity): Promise<GroupResponse> {
    const group = await this.groupService.createGroup(body, currentUser);

    return { group: new SimpleGroupResponse(group) };
  }

  /**
   *
   * @param groupId
   * @param body
   * @param currentUser
   */
  @Post(':groupId')
  @Privileges('groups.add-member')
  @GroupExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'The group that was modified', type: GroupResponse })
  async addMemberToGroup(
    @Param('groupId') groupId: string,
    @Body() body: AddMemberToGroupBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<GroupResponse> {
    await this.groupService.addMembersToGroup(groupId, body.members, currentUser.id);
    const group = await this.groupService.getGroup(groupId);

    return { group: new SimpleGroupResponse(group) };
  }

  /**
   *
   * @param groupId
   */
  @Get(':groupId')
  @Privileges('groups.view')
  @GroupExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'The group that was retrieved', type: GroupResponse })
  async getGroup(@Param('groupId') groupId: string): Promise<GroupResponse> {
    const group = await this.groupService.getGroup(groupId);

    return {
      group: new SimpleGroupResponse(group),
    };
  }

  /**
   *
   * @param groupId
   * @param body
   * @param currentUser
   */
  @Put(':groupId')
  @Privileges('groups.update')
  @GroupExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'The group that was modified', type: GroupResponse })
  async updateGroup(
    @Param('groupId') groupId: string,
    @Body() body: CreateGroupBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<GroupResponse> {
    const group = await this.groupService.updateGroup(groupId, body, currentUser);

    return {
      group: new SimpleGroupResponse(group),
    };
  }
}
