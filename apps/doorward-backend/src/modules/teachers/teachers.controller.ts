import { Controller, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';

@Controller('teachers')
@ApiTags('teachers')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class TeachersController {
  constructor(private teachersService: TeachersService) {}
}
