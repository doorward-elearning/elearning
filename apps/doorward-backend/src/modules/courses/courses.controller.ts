import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import CreateCourseBody from '@doorward/common/dtos/create.course.body';
import { CoursesService } from './courses.service';
import { ModulesService } from '../modules/modules.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import CourseResponse from '@doorward/common/dtos/course.response';
import AllowedRoles from '../../decorators/roles.decorator';
import { Roles } from '@doorward/common/types/roles';
import RolesGuard from '../../guards/roles.guard';

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
  async getCourses(){

  }
}
