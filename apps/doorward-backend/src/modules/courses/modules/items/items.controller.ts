import { Body, Controller, Get, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../guards/privileges.guard';
import Privileges from '../../../../decorators/privileges.decorator';
import { ItemsService } from './items.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { ApiBody, ApiResponse, refs } from '@nestjs/swagger';
import { ModuleItemResponse } from '@doorward/common/dtos/response/modules.responses';

const ModuleItemExists = () =>
  ModelExists({
    key: 'itemId',
    model: ModuleItemEntity,
    message: 'This {{moduleItem}} does not exist.',
  });

@Controller('module/items')
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A single module item',
    type: ModuleItemResponse,
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModuleItemResponse,
    description: 'The module item that was updated.',
  })
  @ApiBody({
    schema: { anyOf: refs(CreateModuleItemBody, CreateQuizBody) },
  })
  async updateModuleItem(
    @Param('itemId') itemId: string,
    @Body() body: CreateModuleItemBody | CreateQuizBody,
    @CurrentUser() author: UserEntity
  ): Promise<ModuleItemResponse> {
    if (body.type === ModuleItemType.QUIZ) {
      await YupValidationPipe.validate(CreateQuizBody, body as CreateQuizBody);
    }
    const existingItem = await this.itemsService.getModuleItem(itemId);
    const moduleItem = await this.itemsService.createOrUpdateModuleItem(existingItem.module.id, body, author, itemId);

    return {
      item: moduleItem,
      message: `${body.type} has been updated.`,
    };
  }
}
