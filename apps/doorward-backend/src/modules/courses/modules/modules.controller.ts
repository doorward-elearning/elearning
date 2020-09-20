import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { ModulesService } from './modules.service';
import Privileges from '../../../decorators/privileges.decorator';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { ApiBody, ApiResponse, refs } from '@nestjs/swagger';
import { CourseExists } from '../courses.controller';
import {
  DeleteModuleResponse, ModuleItemResponse,
  ModuleResponse,
  UpdateModulesOrderResponse,
} from '@doorward/common/dtos/response/modules.responses';

export const ModuleExists = () =>
  ModelExists({
    key: 'moduleId',
    model: ModuleEntity,
    message: '{{module}} does not exist.',
  });

@Controller('modules')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  /**
   *
   * @param moduleId
   */
  @Get(':moduleId')
  @Privileges('modules.read')
  @ModuleExists()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModuleResponse,
    description: 'The module that was retrieved.',
  })
  async getModule(@Param('moduleId') moduleId: string): Promise<ModuleResponse> {
    const module = await this.modulesService.getModule(moduleId);

    return {
      module,
    };
  }

  /**
   *
   * @param moduleId
   * @param body
   * @param user
   */
  @Post(':moduleId/items')
  @Privileges('moduleItems.create')
  @ModuleExists()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ModuleItemResponse,
    description: 'The module item that was created.',
  })
  @ApiBody({
    schema: { anyOf: refs(CreateModuleItemBody, CreateQuizBody) },
  })
  async createModuleItem(
    @Param('moduleId') moduleId: string,
    @Body() body: CreateModuleItemBody | CreateQuizBody,
    @CurrentUser() user: UserEntity
  ): Promise<ModuleItemResponse> {
    if (body.type === ModuleItemType.QUIZ) {
      await YupValidationPipe.validate(CreateQuizBody, body);
    }
    const moduleItem = await this.modulesService.createModuleItem(moduleId, body, user);

    return {
      item: moduleItem,
      statusCode: HttpStatus.CREATED,
      message: `${body.type} has been added to {{module}}.`,
    };
  }

  /**
   *
   * @param body
   * @param moduleId
   */
  @Put(':moduleId')
  @Privileges('modules.update')
  @ModuleExists()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModuleResponse,
    description: 'The module that was updated.',
  })
  async updateModule(@Body() body: UpdateModuleBody, @Param('moduleId') moduleId: string): Promise<ModuleResponse> {
    const module = await this.modulesService.updateModule(moduleId, body);

    return { module, message: '{{module}} has been updated.' };
  }

  /**
   *
   * @param moduleId
   */
  @Delete(':moduleId')
  @Privileges('modules.delete')
  @ModuleExists()
  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteModuleResponse,
    description: 'The id of the module that was deleted.',
  })
  async deleteModule(@Param('moduleId') moduleId: string): Promise<DeleteModuleResponse> {
    await this.modulesService.deleteModule(moduleId);

    return {
      id: moduleId,
      message: '{{module}} has been deleted.',
    };
  }

  /**
   *
   * @param body
   */
  @Put()
  @CourseExists()
  @Privileges('modules.update')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The modules that were updated and their orders',
    type: UpdateModulesOrderResponse,
  })
  async updateCourseModules(@Body() body: UpdateModulesBody): Promise<UpdateModulesOrderResponse> {
    const modules = await this.modulesService.updateModuleOrders(body);

    return { modules };
  }
}
