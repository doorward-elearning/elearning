import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
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
import { AddStudentsToCourseBody, CreateUserBody } from '@doorward/common/dtos/body';

const CourseExists = () =>
  ModelExists({
    key: 'courseId',
    model: CourseEntity,
    message: '{{course}} does not exist.',
  });

const StudentExists = () =>
  ModelExists({
    key: 'studentId',
    model: UserEntity,
    message: '{{student}} does not exist.',
  });

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
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentsResponse,
    description: 'The students in the specified course.',
  })
  async getStudentsInCourse(@Param('courseId') courseId: string): Promise<StudentsResponse> {
    const students = await this.studentsService.getStudentsInCourse(courseId);

    return { students };
  }

  /**
   *
   * @param courseId
   * @param body
   * @param origin
   */
  @Post('course/:courseId')
  @Privileges('course-students.create')
  @CourseExists()
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentResponse,
    description: 'The student that was created',
  })
  async createStudentInCourse(
    @Param('courseId') courseId: string,
    @Body() body: CreateUserBody,
    @Origin() origin: string
  ): Promise<StudentResponse> {
    const student = await this.studentsService.createStudentInCourse(body, courseId, origin);

    return { student, message: '{{student}} has been added to the course.' };
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
  @ApiQuery({
    name: 'search',
    required: false,
  })
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
}
