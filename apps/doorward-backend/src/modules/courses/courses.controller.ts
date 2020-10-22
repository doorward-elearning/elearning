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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CourseResponse,
  CoursesResponse,
  DeleteCourseResponse,
} from '@doorward/common/dtos/response/courses.responses';
import { ModuleResponse, ModulesResponse } from '@doorward/common/dtos/response/modules.responses';
import { CreateCourseBody, UpdateCourseBody } from '@doorward/common/dtos/body/courses.body';
import { CreateModuleBody } from '@doorward/common/dtos/body';
import { MeetingResponse, ModuleItemsResponse } from '@doorward/common/dtos/response';
import { ApiPaginationQuery, PaginationQuery } from '@doorward/common/dtos/query';
import translate from '@doorward/common/lang/translate';

export const CourseExists = () =>
  ModelExists({
    key: 'courseId',
    model: CourseEntity,
    message: translate.courseDoesNotExist(),
  });

@Controller('courses')
@ApiTags('courses')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private modulesService: ModulesService,
    private moduleItemsService: ItemsService
  ) {}

  /**
   *
   * @param body
   * @param user
   */
  @Post()
  @Privileges('courses.create')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The course that was created.', type: CourseResponse })
  async createCourse(@Body() body: CreateCourseBody, @CurrentUser() user: UserEntity): Promise<CourseResponse> {
    const course = await this.coursesService.createCourse(body, user);
    return { course, statusCode: HttpStatus.CREATED };
  }

  /**
   *
   * @param user
   * @param pagination
   */
  @Get()
  @Privileges('courses.read')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of courses based on the user privileges',
    type: CoursesResponse,
  })
  @ApiPaginationQuery()
  async getCourses(@CurrentUser() user: UserEntity, @Query() pagination: PaginationQuery): Promise<CoursesResponse> {
    const courses = await this.coursesService.getCourses(user, pagination);

    return { pagination: courses.pagination, courses: courses.entities };
  }

  /**
   *
   * @param user
   * @param courseId
   * @param body
   */
  @Put(':courseId')
  @CourseExists()
  @Privileges('courses.update')
  @ApiResponse({ status: HttpStatus.OK, description: 'The course that was updated', type: CourseResponse })
  async updateCourse(
    @CurrentUser() user: UserEntity,
    @Param('courseId') courseId: string,
    @Body() body: UpdateCourseBody
  ): Promise<CourseResponse> {
    const course = await this.coursesService.updateCourse(courseId, body, user);

    return { course };
  }

  /**
   *
   * @param courseId
   */
  @Get(':courseId')
  @CourseExists()
  @Privileges('courses.read')
  @ApiResponse({ status: HttpStatus.OK, description: 'A single course', type: CourseResponse })
  async getCourse(@Param('courseId') courseId: string): Promise<CourseResponse> {
    const course = await this.coursesService.getCourse(courseId);

    return { course };
  }

  /**
   *
   * @param courseId
   */
  @Delete(':courseId')
  @CourseExists()
  @Privileges('courses.delete')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The id of the course that was deleted',
    type: DeleteCourseResponse,
  })
  async deleteCourse(@Param('courseId') courseId: string): Promise<DeleteCourseResponse> {
    await this.coursesService.deleteCourse(courseId);

    return {
      message: translate.courseHasBeenDeleted(),
      id: courseId,
    };
  }

  /**
   *
   * @param courseId
   */
  @Get(':courseId/modules')
  @CourseExists()
  @Privileges('modules.read')
  @ApiResponse({ status: HttpStatus.OK, description: 'A list of modules in the course', type: ModulesResponse })
  async getCourseModules(@Param('courseId') courseId: string): Promise<ModulesResponse> {
    const modules = await this.modulesService.getModulesInCourse({ id: courseId });

    return { modules };
  }

  /**
   *
   * @param courseId
   * @param type
   */
  @Get(':courseId/modules/items')
  @CourseExists()
  @Privileges('moduleItems.read')
  @ApiQuery({ name: 'type', enum: ModuleItemType, required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A list of module items in the course',
    type: ModuleItemsResponse,
  })
  async getCourseModuleItems(
    @Param('courseId') courseId: string,
    @Query('type') type: ModuleItemType
  ): Promise<ModuleItemsResponse> {
    const items = await this.moduleItemsService.getModuleItemsForCourse({ id: courseId }, type);

    return { items };
  }

  /**
   *
   * @param courseId
   * @param body
   */
  @Post(':courseId/modules')
  @CourseExists()
  @Privileges('modules.create')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The module that was created', type: ModuleResponse })
  async createCourseModule(
    @Param('courseId') courseId: string,
    @Body() body: CreateModuleBody
  ): Promise<ModuleResponse> {
    const module = await this.modulesService.createModule({ id: courseId }, body);

    return {
      module,
      message: translate.moduleHasBeenAddedToCourse(),
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get(':courseId/liveClassroom')
  @CourseExists()
  @ApiResponse({
    type: MeetingResponse,
    description: 'The meeting that was created',
    status: HttpStatus.OK,
  })
  async launchClassroom(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserEntity
  ): Promise<MeetingResponse> {
    const meeting = await this.coursesService.launchClassroom(courseId, user);

    return { ...meeting };
  }
}
