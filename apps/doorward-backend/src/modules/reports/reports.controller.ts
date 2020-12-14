import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';
import { ReportsService } from './reports.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import Privileges from '../../decorators/privileges.decorator';
import {
  StudentReportResponse,
  StudentsReportResponse,
  TeacherReportResponse,
  TeachersReportResponse,
} from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';

const StudentExists = () =>
  ModelExists({ key: 'studentId', model: UserEntity, message: translate('studentDoesNotExist') });

const TeacherExists = () =>
  ModelExists({ key: 'teacherId', model: UserEntity, message: translate('teacherDoesNotExist') });

@Controller('reports')
@ApiTags('reports')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  /**
   *
   */
  @Get('students')
  @Privileges('reports.students')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of students and their reports',
    type: StudentsReportResponse,
  })
  async getStudentsReport(): Promise<StudentsReportResponse> {
    const students = await this.reportsService.studentsReport();

    return { students };
  }

  /**
   *
   */
  @Get('teachers')
  @Privileges('reports.teachers')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of teachers and their reports',
    type: TeachersReportResponse,
  })
  async getTeachersReport(): Promise<TeachersReportResponse> {
    const teachers = await this.reportsService.teachersReport();

    return { teachers };
  }

  /**
   *
   * @param studentId
   */
  @Get('students/:studentId')
  @StudentExists()
  @Privileges('reports.students')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The student and his/her report',
    type: StudentReportResponse,
  })
  async getStudentReport(@Param('studentId') studentId: string): Promise<StudentReportResponse> {
    const student = await this.reportsService.getStudentReport(studentId);
    return { student };
  }

  /**
   *
   * @param teacherId
   */
  @Get('teachers/:teacherId')
  @TeacherExists()
  @Privileges('reports.teachers')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The teacher and his/her report',
    type: TeacherReportResponse,
  })
  async getTeacherReport(@Param('teacherId') teacherId: string): Promise<TeacherReportResponse> {
    const teacher = await this.reportsService.getTeacherReport(teacherId);

    return { teacher };
  }
}
