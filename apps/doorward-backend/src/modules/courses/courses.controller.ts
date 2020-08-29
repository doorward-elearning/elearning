import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import CreateCourseBody from '@doorward/common/dtos/create.course.body';
import { CoursesService } from './courses.service';
import { ModulesService } from './modules/modules.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import CourseResponse, { CoursesResponse } from '@doorward/common/dtos/course.response';
import AllowedRoles from '../../decorators/roles.decorator';
import { Roles } from '@doorward/common/types/roles';
import RolesGuard from '../../guards/roles.guard';
import UpdateCourseBody from '@doorward/common/dtos/update.course.body';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private coursesService: CoursesService, private modulesService: ModulesService) {}

  @Post()
  @AllowedRoles(Roles.TEACHER, Roles.SUPER_ADMINISTRATOR)
  async createCourse(@Body() body: CreateCourseBody, @CurrentUser() user: UserEntity): Promise<CourseResponse> {
    const course = await this.coursesService.createCourse(body, user);
    return { course, statusCode: HttpStatus.CREATED };
  }

  @Get()
  async getCourses(@CurrentUser() user: UserEntity): Promise<CoursesResponse> {
    const courses = await this.coursesService.getCourses(user);

    return { courses };
  }

  @Put(':courseId')
  @ModelExists('courseId', CourseEntity, 'Course does not exist.')
  @AllowedRoles(Roles.TEACHER, Roles.SUPER_ADMINISTRATOR)
  async updateCourse(
    @CurrentUser() user: UserEntity,
    @Param('courseId') courseId: string,
    @Body() body: UpdateCourseBody
  ): Promise<CourseResponse> {
    const course = await this.coursesService.updateCourse(courseId, body, user);

    return { course };
  }

  @Get(':courseId')
  @ModelExists('courseId', CourseEntity, 'Course does not exist.')
  async getCourse(@Param('courseId') courseId: string): Promise<CourseResponse> {
    const course = await this.coursesService.getCourse(courseId);

    return { course };
  }

  @Delete(':courseId')
  @ModelExists('courseId', CourseEntity, 'Course does not exist.')
  @AllowedRoles(Roles.TEACHER, Roles.SUPER_ADMINISTRATOR)
  async deleteCourse(@Param('courseId') courseId: string): Promise<ApiResponse> {
    await this.coursesService.deleteCourse(courseId);

    return {
      message: 'Course has been deleted.',
    };
  }

}
