import { Controller, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import RolesGuard from '../../../guards/roles.guard';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ModulesController {

  @Put(':courseId/modules')
  async updateCourseModules() {}
}
