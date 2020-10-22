import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import ModelExists, { ModelsExist } from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';
import Privileges from '../../decorators/privileges.decorator';
import { StudentsService } from './students.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import { PinoLogger } from 'nestjs-pino/dist';
import UserEntity from '@doorward/common/entities/user.entity';
import { StudentResponse, StudentsResponse } from '@doorward/common/dtos/response/students.responses';
import {
  AddStudentsToCourseBody,
  CreateUserBody,
  ForceChangePasswordBody,
  UpdateUserBody,
} from '@doorward/common/dtos/body';
import ExcludeNullValidationPipe from '@doorward/backend/pipes/exclude.null.validation.pipe';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import { ApiPaginationQuery, PaginationQuery } from '@doorward/common/dtos/query';
import translate from '@doorward/common/lang/translate';

const CourseExists = () =>
  ModelExists({ key: 'courseId', model: CourseEntity, message: translate.courseDoesNotExist() });

const StudentExists = () =>
  ModelExists({ key: 'studentId', model: UserEntity, message: translate.studentDoesNotExist() });

/**
 *
 */
@Controller('students')
@ApiTags('students')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService, private logger: PinoLogger) {
    logger.setContext('StudentsController');
  }

  /**
   *
   * @param courseId
   */
  @Get('course/:courseId')
  @Privileges('course-students.view')
  @CourseExists()
  @ApiResponse({ status: HttpStatus.OK, type: StudentsResponse, description: 'The students in the specified course.' })
  async getStudentsInCourse(@Param('courseId') courseId: string): Promise<StudentsResponse> {
    const students = await this.studentsService.getStudentsInCourse(courseId);

    return { students, pagination: null };
  }

  /**
   *
   * @param courseId
   * @param body
   * @param origin
   * @param user
   */
  @Post('course/:courseId')
  @Privileges('course-students.create')
  @CourseExists()
  @ApiResponse({ status: HttpStatus.OK, type: StudentResponse, description: 'The student that was created' })
  async createStudentInCourse(
    @Param('courseId') courseId: string,
    @Body() body: CreateUserBody,
    @Origin() origin: string,
    @CurrentUser() user: UserEntity
  ): Promise<StudentResponse> {
    const student = await this.studentsService.createStudentInCourse(body, user, origin, courseId);

    return { student, message: translate.studentHasBeenAddedToCourse() };
  }

  /**
   *
   * @param courseId
   * @param search
   */
  @Get('course/:courseId/not-registered')
  @Privileges('course-students.view')
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentsResponse,
    description: 'The students that are not registered to this course',
  })
  @ApiQuery({ name: 'search', required: false })
  async getStudentsNotRegisteredToCourse(@Param('courseId') courseId: string, @Query('search') search: string) {
    const students = await this.studentsService.getStudentNotRegisteredInCourse(courseId, search);

    return { students };
  }

  /**
   *
   * @param courseId
   * @param body
   */
  @Post('course/:courseId/register')
  @Privileges('course-students.create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentsResponse,
    description: 'The students that were added to a course',
  })
  async addStudentToCourse(@Param('courseId') courseId: string, @Body() body: AddStudentsToCourseBody) {
    const students = await this.studentsService.addStudentsToCourse(body, courseId);

    return { students };
  }

  /**
   *
   * @param courseId
   * @param studentId
   */
  @Delete('course/:courseId/un-enroll/:studentId')
  @Privileges('course-students.un-enroll')
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentResponse,
    description: 'The student that was un-enrolled from the course',
  })
  @ModelsExist(CourseExists, StudentExists)
  async unEnrollStudentFromCourse(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string
  ): Promise<StudentResponse> {
    const student = await this.studentsService.unEnrollStudentFromCourse(studentId, courseId);

    return { student, message: '{{student}} has been un-enrolled from the {{course}}' };
  }

  /**
   *
   * @param body
   * @param origin
   * @param user
   */
  @Post()
  @Privileges('students.create')
  @ApiResponse({ status: HttpStatus.OK, type: StudentResponse, description: 'The student that was created.' })
  async createStudent(
    @Body() body: CreateUserBody,
    @Origin() origin: string,
    @CurrentUser() user: UserEntity
  ): Promise<StudentResponse> {
    const student = await this.studentsService.createStudentInCourse(body, user, origin);

    return { student, message: translate.studentCreated() };
  }

  /**
   *
   * @param studentId
   * @param body
   */
  @Put(':studentId')
  @Privileges('students.update')
  @StudentExists()
  @ApiResponse({ status: HttpStatus.OK, type: StudentResponse, description: 'The student that was updated' })
  @UsePipes(ExcludeNullValidationPipe)
  async updateStudent(@Param('studentId') studentId: string, @Body() body: UpdateUserBody): Promise<StudentResponse> {
    const student = await this.studentsService.updateStudent(studentId, body);

    return { student, message: translate.studentUpdated() };
  }

  /**
   *
   */
  @Get()
  @Privileges('students.list')
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: StudentsResponse, description: 'The list of students' })
  @ApiPaginationQuery()
  async getAllStudents(@Query('search') search: string, @Query() page: PaginationQuery): Promise<StudentsResponse> {
    const students = await this.studentsService.getAllStudents(search, page);

    return { students: students.entities, pagination: students.pagination };
  }

  /**
   *
   * @param studentId
   */
  @Get(':studentId')
  @Privileges('students.view')
  @StudentExists()
  @TransformerGroups('fullUserProfile')
  @ApiResponse({ status: HttpStatus.OK, type: StudentResponse, description: 'The student with the specified i' })
  async getStudent(@Param('studentId') studentId: string): Promise<StudentResponse> {
    const student = await this.studentsService.getStudentById(studentId);

    return { student };
  }

  /**
   *
   * @param studentId
   * @param body
   */
  @Post(':studentId/changePassword')
  @Privileges('students.change-password')
  @StudentExists()
  async updateStudentPassword(@Param('studentId') studentId: string, @Body() body: ForceChangePasswordBody) {
    await this.studentsService.changePassword(studentId, body);

    return { message: translate.studentPasswordChanged() };
  }
}
