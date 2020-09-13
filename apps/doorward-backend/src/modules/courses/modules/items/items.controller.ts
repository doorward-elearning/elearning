import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../guards/privileges.guard';
import Privileges from '../../../../decorators/privileges.decorator';
import { ItemsService } from './items.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { CreateModuleItemBody, CreateQuizBody } from '@doorward/common/dtos/body';
import { ModuleItemResponse } from '@doorward/common/dtos/response';

const ModuleItemExists = () => ModelExists('itemId', ModuleItemEntity, 'This {{moduleItem}} does not exist.');

@Controller('module/items')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get(':itemId')
  @Privileges('moduleItems.read')
  @ModuleItemExists()
  async getModuleItem(@Param('itemId') itemId: string): Promise<ModuleItemResponse> {
    const moduleItem = await this.itemsService.getModuleItem(itemId);

    return {
      item: moduleItem,
    };
  }

  @Put(':itemId')
  @Privileges('moduleItems.update')
  @ModuleItemExists()
  async updateModuleItem(
    @Param('itemId') itemId: string,
    @Body() body: CreateModuleItemBody,
    @CurrentUser() author: UserEntity
  ) {
    const existingItem = await this.itemsService.getModuleItem(itemId);
    const moduleItem = await this.itemsService.createOrUpdateModuleItem(existingItem.module.id, body, author, itemId);

    return {
      item: moduleItem,
      message: `${body.title} has been updated.`,
    };
  }

  @Put('quiz/:itemId')
  @Privileges('moduleItems.update')
  @ModuleItemExists()
  async updateQuiz(@Param('itemId') itemId: string, @Body() body: CreateQuizBody, @CurrentUser() author: UserEntity) {
    return this.updateModuleItem(itemId, body, author);
  }
}
