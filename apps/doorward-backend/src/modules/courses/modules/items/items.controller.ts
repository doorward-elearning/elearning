import { Body, Controller, Get, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../guards/privileges.guard';
import Privileges from '../../../../decorators/privileges.decorator';
import { ItemsService } from './items.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { ApiBody, ApiResponse, ApiTags, refs } from '@nestjs/swagger';
import {
  CreateAssessmentBody,
  CreateAssignmentBody,
  CreateExamBody,
  CreateModuleItemBody,
  CreatePageBody,
  CreateQuizBody,
  CreateVideoBody,
} from '@doorward/common/dtos/body';
import { ModuleItemResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import PayloadSize from '@doorward/backend/decorators/payload.size.decorator';
import dataSize from '@doorward/common/utils/dataSize';

const ModuleItemExists = () =>
  ModelExists({
    key: 'itemId',
    model: ModuleItemEntity,
    message: translate('moduleItemDoesNotExist'),
  });

@Controller('module/items')
@ApiTags('moduleItems')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  /**
   *
   * @param itemId
   */
  @Get(':itemId')
  @Privileges('moduleItems.read')
  @ModuleItemExists()
  @PayloadSize(dataSize.MB(1))
  @ApiResponse({ status: HttpStatus.OK, description: 'A single module item', type: ModuleItemResponse })
  async getModuleItem(@Param('itemId') itemId: string): Promise<ModuleItemResponse> {
    const moduleItem = await this.itemsService.getModuleItem(itemId);

    return {
      item: moduleItem,
    };
  }

  /**
   *
   * @param itemId
   * @param body
   * @param author
   */
  @Put(':itemId')
  @Privileges('moduleItems.update')
  @ModuleItemExists()
  @PayloadSize(dataSize.MB(1))
  @ApiResponse({ status: HttpStatus.OK, type: ModuleItemResponse, description: 'The module item that was updated.' })
  @ApiBody({
    schema: {
      anyOf: refs(
        CreateModuleItemBody,
        CreateQuizBody,
        CreateAssignmentBody,
        CreatePageBody,
        CreateQuizBody,
        CreateAssessmentBody,
        CreateVideoBody
      ),
    },
  })
  async updateModuleItem(
    @Param('itemId') itemId: string,
    @Body()
    body:
      | CreateModuleItemBody
      | CreateAssessmentBody
      | CreateAssignmentBody
      | CreatePageBody
      | CreateExamBody
      | CreateVideoBody
      | CreateQuizBody,
    @CurrentUser() author: UserEntity
  ): Promise<ModuleItemResponse> {
    if (body.type === ModuleItemType.ASSESSMENT) {
      await YupValidationPipe.validate(CreateAssessmentBody, body);
      if ((body as CreateAssessmentBody).assessmentType === AssessmentTypes.EXAM) {
        await YupValidationPipe.validate(CreateExamBody, body);
      } else if ((body as CreateAssessmentBody).assessmentType === AssessmentTypes.QUIZ) {
        await YupValidationPipe.validate(CreateQuizBody, body);
      }
    } else if (body.type === ModuleItemType.PAGE) {
      await YupValidationPipe.validate(CreatePageBody, body);
    } else if (body.type === ModuleItemType.ASSIGNMENT) {
      await YupValidationPipe.validate(CreateAssignmentBody, body);
    } else if (body.type === ModuleItemType.VIDEO) {
      await YupValidationPipe.validate(CreateVideoBody, body);
    }
    const existingItem = await this.itemsService.getModuleItem(itemId);
    const moduleItem = await this.itemsService.createOrUpdateModuleItem(existingItem.module.id, body, author, itemId);

    return {
      item: moduleItem,
      message: translate('moduleItemWasUpdated', { moduleItem: body.type }),
    };
  }
}
