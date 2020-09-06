import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import CreateCourseBody from '@doorward/common/dtos/create.course.body';
import { CoursesService } from './courses.service';
import { ModulesService } from './modules/modules.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import CourseResponse, { CoursesResponse } from '@doorward/common/dtos/course.response';
import PrivilegesGuard from '../../guards/privileges.guard';
import UpdateCourseBody from '@doorward/common/dtos/update.course.body';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import ModuleResponse, { ModulesResponse } from '@doorward/common/dtos/module.response';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { ItemsService } from './modules/items/items.service';
import { ModuleItemsResponse } from '@doorward/common/dtos/module.item.response';
import CreateModuleBody from '@doorward/common/dtos/create.module.body';
import Privileges from '../../decorators/privileges.decorator';

export const CourseExists = () => ModelExists('courseId', CourseEntity, 'Course does not exist.');

@Controller('courses')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private modulesService: ModulesService,
    private moduleItemsService: ItemsService
  ) {}

  @Post()
  @Privileges('course.create')
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
  @CourseExists()
  @Privileges('course.update')
  async updateCourse(
    @CurrentUser() user: UserEntity,
    @Param('courseId') courseId: string,
    @Body() body: UpdateCourseBody
  ): Promise<CourseResponse> {
    const course = await this.coursesService.updateCourse(courseId, body, user);

    return { course };
  }

  @Get(':courseId')
  @CourseExists()
  async getCourse(@Param('courseId') courseId: string): Promise<CourseResponse> {
    const course = await this.coursesService.getCourse(courseId);

    return { course };
  }

  @Delete(':courseId')
  @CourseExists()
  @Privileges('course.delete')
  async deleteCourse(@Param('courseId') courseId: string): Promise<ApiResponse> {
    await this.coursesService.deleteCourse(courseId);

    return {
      message: 'Course has been deleted.',
    };
  }

  @Get(':courseId/modules')
  @CourseExists()
  async getCourseModules(@Param('courseId') courseId: string): Promise<ModulesResponse> {
    const modules = await this.modulesService.getModulesInCourse({ id: courseId });

    return { modules };
  }

  @Get(':courseId/modules/items')
  @CourseExists()
  async getCourseModuleItems(
    @Param('courseId') courseId: string,
    @Query('type') type: ModuleItemType
  ): Promise<ModuleItemsResponse> {
    const items = await this.moduleItemsService.getModuleItemsForCourse({ id: courseId }, type);

    return { items };
  }

  @Post(':courseId/modules')
  @CourseExists()
  @Privileges('modules.create')
  async createCourseModule(
    @Param('courseId') courseId: string,
    @Body() body: CreateModuleBody
  ): Promise<ModuleResponse> {
    const course = await this.coursesService.getCourse(courseId);
    const module = await this.modulesService.createModule({ id: courseId }, body);

    return {
      module,
      message: module.title + ' has been added to ' + course.title,
    };
  }
}
