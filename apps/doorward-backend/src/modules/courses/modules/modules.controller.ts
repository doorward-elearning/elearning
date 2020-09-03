import { Controller, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import RolesGuard from '../../../guards/roles.guard';
import { ModulesService } from './modules.service';
import AllowedRoles from '../../../decorators/roles.decorator';
import { Roles } from '@doorward/common/types/roles';

@Controller('modules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Put(':moduleId')
  @AllowedRoles(Roles.SUPER_ADMINISTRATOR, Roles.TEACHER)
  async updateModule() {}
}
