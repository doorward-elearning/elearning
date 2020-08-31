import { Controller, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import RolesGuard from '../../../guards/roles.guard';
import { ModulesService } from './modules.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ModulesController {
  constructor(private modulesService: ModulesService) {}
}
