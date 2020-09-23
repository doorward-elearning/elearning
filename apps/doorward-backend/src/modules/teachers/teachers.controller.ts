import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';
import { CreateUserBody } from '@doorward/common/dtos/body';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import Public from '@doorward/backend/decorators/public.decorator';
import { TeacherResponse, TeachersResponse } from '@doorward/common/dtos/response';

@Controller('teachers')
@ApiTags('teachers')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The teacher that was created', type: TeacherResponse })
  async createTeacherAccount(
    @Body() body: CreateUserBody,
    @Origin() origin: string,
    @CurrentUser() currentUser: UserEntity
  ): Promise<TeacherResponse> {
    const teacher = await this.teachersService.createTeacher(body, currentUser, origin);

    return { teacher, message: '{{teacher}} has been created successfully.' };
  }

  @Post('freeTrial')
  @Public()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The teacher that was created', type: TeacherResponse })
  async createFreeTrialTeacherAccount(@Body() body: CreateUserBody, @Origin() origin: string) {
    const teacher = await this.teachersService.createTeacher(body, null, origin);

    return { teacher, message: '{{teacher}} account has been created.' };
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'The list of teachers in the system', type: TeachersResponse })
  async getAllTeachers() {
    const teachers = await this.teachersService.getAllTeachers();
    return { teachers };
  }
}
