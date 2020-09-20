import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { ManagersService } from './managers.service';
import { ApiResponse } from '@nestjs/swagger';
import Privileges from '../../../decorators/privileges.decorator';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import ModelExists, { ModelsExist } from '@doorward/backend/decorators/model.exists.decorator';
import { CourseExists } from '../courses.controller';
import {
  CourseManagerResponse,
  CourseManagersResponse,
} from '@doorward/common/dtos/response/course.managers.responses';
import { AddCourseManagerBody } from '@doorward/common/dtos/body/course.managers.body';

const UserExists = () => ModelExists({ key: 'managerId', model: UserEntity, message: '{{user}} does not exist.' });

@Controller('course-managers')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ManagersController {
  constructor(private managerService: ManagersService) {}

  @Get(':courseId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of course managers for this course.',
    type: CourseManagersResponse,
  })
  @CourseExists()
  @Privileges('course-managers.view')
  async getCourseManagers(@Param('courseId') courseId: string): Promise<CourseManagersResponse> {
    const courseManagers = await this.managerService.getCourseManagers(courseId);

    return { courseManagers };
  }

  @Post(':courseId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The course manager that was created',
    type: CourseManagerResponse,
  })
  @Privileges('course-managers.create')
  @ModelsExist(CourseExists, UserExists)
  async createCourseManager(
    @Param('courseId') courseId: string,
    @Body() body: AddCourseManagerBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<CourseManagerResponse> {
    const courseManager = await this.managerService.createCourseManager(courseId, body, currentUser);

    return { courseManager, message: `${courseManager.manager.fullName} has been added as a {{courseManager}}` };
  }
}
