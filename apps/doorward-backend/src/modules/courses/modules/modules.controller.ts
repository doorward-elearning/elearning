import { Controller, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { ModulesService } from './modules.service';
import Privileges from '../../../decorators/privileges.decorator';

@Controller('modules')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Put(':moduleId')
  @Privileges('update.module')
  async updateModule() {}
}
