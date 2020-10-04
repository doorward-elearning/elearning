import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { DiscussionGroupsService } from './discussion-groups.service';
import Privileges from '../../../decorators/privileges.decorator';
import { DiscussionGroupsResponse } from '@doorward/common/dtos/response/discussion.groups.responses';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';

const CourseExists = () =>
  ModelExists({
    model: CourseEntity,
    key: 'courseId',
    message: '{{course}} does not exist.',
  });

@Controller('discussion-groups')
@ApiTags('discussionGroups')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class DiscussionGroupsController {
  constructor(private discussionGroupsService: DiscussionGroupsService) {}

  @Get(':courseId')
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
}
