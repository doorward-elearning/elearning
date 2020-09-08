import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { ModulesService } from './modules.service';
import Privileges from '../../../decorators/privileges.decorator';
import UpdateModuleBody from '@doorward/common/dtos/update.module.body';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleEntity from '@doorward/common/entities/module.entity';
import ModuleResponse, { DeleteModuleResponse } from '@doorward/common/dtos/module.response';
import CreateModuleItemBody from '@doorward/common/dtos/create.module.item.body';

export const ModuleExists = () => ModelExists('moduleId', ModuleEntity, '{{module}} does not exist.');

@Controller('modules')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Put(':moduleId')
  @Privileges('modules.update')
  @ModuleExists()
  async updateModule(@Body() body: UpdateModuleBody, @Param('moduleId') moduleId: string): Promise<ModuleResponse> {
    const module = await this.modulesService.updateModule(moduleId, body);

    return { module };
  }

  @Delete(':moduleId')
  @Privileges('modules.delete')
  @ModuleExists()
  async deleteModule(@Param('moduleId') moduleId: string): Promise<DeleteModuleResponse> {
    await this.modulesService.deleteModule(moduleId);

    return {
      id: moduleId,
      message: '{{module}} has been deleted.',
    };
  }

  @Get(':moduleId')
  @Privileges('modules.read')
  @ModuleExists()
  async getModule(@Param('moduleId') moduleId: string): Promise<ModuleResponse> {
    const module = await this.modulesService.getModule(moduleId);

    return {
      module,
    };
  }

  @Post(":moduleId/items")
  @Privileges("moduleItems.create")
  @ModuleExists()
  async createModuleItem(@Param("moduleId") moduleId: string, @Body() body: CreateModuleItemBody) {
    const moduleItem = await this.modulesService.createModuleItem(moduleId, body);
  }
}
