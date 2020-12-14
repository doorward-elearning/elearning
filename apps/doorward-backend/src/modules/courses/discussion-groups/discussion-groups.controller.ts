import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { DiscussionGroupsService } from './discussion-groups.service';
import Privileges from '../../../decorators/privileges.decorator';
import {
  DiscussionCommentResponse,
  DiscussionGroupResponse,
  DiscussionGroupsResponse,
} from '@doorward/common/dtos/response/discussion.groups.responses';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';
import { CreateDiscussionGroupBody, PostDiscussionCommentBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import translate from '@doorward/common/lang/translate';

const CourseExists = () =>
  ModelExists({
    model: CourseEntity,
    key: 'courseId',
    message: translate('courseDoesNotExist'),
  });

const DiscussionGroupExists = () =>
  ModelExists({
    model: DiscussionGroupEntity,
    key: 'discussionGroupId',
    message: translate('discussionGroupDoesNotExist'),
  });

@Controller('discussion-groups')
@ApiTags('discussionGroups')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class DiscussionGroupsController {
  constructor(private discussionGroupsService: DiscussionGroupsService) {}

  @Get('course/:courseId')
  @Privileges('discussion-groups.list')
  @CourseExists()
  @ApiResponse({
    type: DiscussionGroupsResponse,
    status: HttpStatus.OK,
    description: 'The list of discussion groups in the specified course',
  })
  async getAll(@Param('courseId') courseId: string): Promise<DiscussionGroupsResponse> {
    const discussionGroups = await this.discussionGroupsService.getAll(courseId);

    return { discussionGroups };
  }

  @Post('course/:courseId')
  @Privileges('discussion-groups.create')
  @CourseExists()
  @ApiResponse({
    type: DiscussionGroupResponse,
    status: HttpStatus.CREATED,
    description: 'The discussion group that was created',
  })
  async createDiscussionGroup(
    @Param('courseId') courseId: string,
    @Body() body: CreateDiscussionGroupBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<DiscussionGroupResponse> {
    const discussionGroup = await this.discussionGroupsService.createDiscussionGroup(courseId, body, currentUser);

    return { discussionGroup, message: translate('discussionGroupHasBeenAdded') };
  }

  @Post('post/:discussionGroupId')
  @Privileges('discussion-groups.post')
  @DiscussionGroupExists()
  @ApiResponse({
    type: DiscussionCommentResponse,
    status: HttpStatus.CREATED,
    description: 'The discussion group comment',
  })
  async postComment(
    @Param('discussionGroupId') discussionGroupId: string,
    @Body() body: PostDiscussionCommentBody,
    @CurrentUser() user: UserEntity
  ) {
    const discussionComment = await this.discussionGroupsService.postComment(discussionGroupId, body, user);

    return {
      discussionComment,
    };
  }

  @Get('view/:discussionGroupId')
  @Privileges('discussion-groups.view')
  @DiscussionGroupExists()
  @ApiResponse({
    type: DiscussionGroupResponse,
    status: HttpStatus.OK,
    description: 'The discussion group with the specified id.',
  })
  async getDiscussionGroup(@Param('discussionGroupId') discussionGroupId: string) {
    const discussionGroup = await this.discussionGroupsService.getDiscussionGroup(discussionGroupId);

    return { discussionGroup };
  }
}
