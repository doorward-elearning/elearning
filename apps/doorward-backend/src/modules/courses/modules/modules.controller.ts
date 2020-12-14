import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../guards/privileges.guard';
import { ModulesService } from './modules.service';
import Privileges from '../../../decorators/privileges.decorator';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { ApiBody, ApiResponse, ApiTags, refs } from '@nestjs/swagger';
import { CourseExists } from '../courses.controller';
import {
  DeleteModuleResponse,
  ModuleResponse,
  UpdateModulesOrderResponse,
} from '@doorward/common/dtos/response/modules.responses';
import {
  CreateAssessmentBody,
  CreateAssignmentBody,
  CreateExamBody,
  CreateModuleItemBody,
  CreatePageBody,
  CreateQuizBody,
  UpdateModuleBody,
  UpdateModulesBody,
} from '@doorward/common/dtos/body';
import { ModuleItemResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';

export const ModuleExists = () =>
  ModelExists({ key: 'moduleId', model: ModuleEntity, message: translate('moduleDoesNotExist') });

@Controller('modules')
@ApiTags('modules')
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
  @ApiResponse({ status: HttpStatus.OK, type: ModuleResponse, description: 'The module that was retrieved.' })
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
    schema: {
      anyOf: refs(
        CreateModuleItemBody,
        CreateQuizBody,
        CreateAssignmentBody,
        CreatePageBody,
        CreateAssessmentBody,
        CreateExamBody
      ),
    },
  })
  async createModuleItem(
    @Param('moduleId') moduleId: string,
    @Body()
    body:
      | CreateModuleItemBody
      | CreateQuizBody
      | CreateAssignmentBody
      | CreatePageBody
      | CreateAssessmentBody
      | CreateExamBody,
    @CurrentUser() user: UserEntity
  ): Promise<ModuleItemResponse> {
    if (body.type === ModuleItemType.ASSESSMENT) {
      if ((body as CreateAssessmentBody).assessmentType === AssessmentTypes.EXAM) {
        await YupValidationPipe.validate(CreateExamBody, body);
      } else if ((body as CreateAssessmentBody).assessmentType === AssessmentTypes.QUIZ) {
        await YupValidationPipe.validate(CreateQuizBody, body);
      }
    } else if (body.type === ModuleItemType.ASSIGNMENT) {
      await YupValidationPipe.validate(CreateAssignmentBody, body);
    } else if (body.type === ModuleItemType.PAGE) {
      await YupValidationPipe.validate(CreatePageBody, body);
    }
    const moduleItem = await this.modulesService.createModuleItem(moduleId, body, user);

    return {
      item: moduleItem,
      statusCode: HttpStatus.CREATED,
      message: translate('moduleItemHasBeenAddedToModule', { moduleItem: body.type }),
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
  @ApiResponse({ status: HttpStatus.OK, type: ModuleResponse, description: 'The module that was updated.' })
  async updateModule(@Body() body: UpdateModuleBody, @Param('moduleId') moduleId: string): Promise<ModuleResponse> {
    const module = await this.modulesService.updateModule(moduleId, body);

    return { module, message: translate('moduleHasBeenUpdated') };
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
      message: translate('moduleHasBeenDeleted'),
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
    const modules = await this.modulesService.updateModules(body);

    return { modules };
  }
}
