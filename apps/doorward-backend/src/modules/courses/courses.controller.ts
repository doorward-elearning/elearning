import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import { CoursesService } from './courses.service';
import { ModulesService } from './modules/modules.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import PrivilegesGuard from '../../guards/privileges.guard';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { ItemsService } from './modules/items/items.service';
import Privileges from '../../decorators/privileges.decorator';
import DApiResponse from '@doorward/common/dtos/response/d.api.response';
import CourseResponse, {
  CoursesResponse,
  ModuleItemsResponse,
  ModuleResponse,
  ModulesResponse,
} from '@doorward/common/dtos/response';
import { CreateCourseBody, CreateModuleBody, UpdateCourseBody } from '@doorward/common/dtos/body';
import { ApiQuery } from '@nestjs/swagger';

export const CourseExists = () => ModelExists('courseId', CourseEntity, '{{course}} does not exist.');

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
  async deleteCourse(@Param('courseId') courseId: string): Promise<DApiResponse> {
    await this.coursesService.deleteCourse(courseId);

    return {
      message: '{{course}} has been deleted.',
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
  @Privileges('moduleItems.read')
  @ApiQuery({ name: 'type', enum: ModuleItemType, required: false })
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
