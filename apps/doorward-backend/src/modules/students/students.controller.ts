import { Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import CourseEntity from '@doorward/common/entities/course.entity';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';
import Privileges from '../../decorators/privileges.decorator';
import { StudentsService } from './students.service';
import { StudentResponse, StudentsResponse } from '@doorward/common/dtos/response';
import { ApiResponse } from '@nestjs/swagger';

const CourseExists = () => ModelExists('courseId', CourseEntity, '{{course}} does not exist.');

@Controller('students')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

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

  @Post('course/:courseId')
  @Privileges('course-students.create')
  @CourseExists()
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentResponse,
    description: 'The student that was created',
  })
  async createStudentInCourse(@Param('courseId') courseId: string): Promise<StudentResponse> {
    return null;
  }
}
