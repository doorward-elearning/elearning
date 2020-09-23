import OrganizationBasedRepository from './organization.based.repository';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { EntityRepository } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from '@doorward/common/entities/module.entity';

@EntityRepository(ModuleItemEntity)
export default class ModuleItemsRepository extends OrganizationBasedRepository<ModuleItemEntity> {
  private moduleItemsQueryBuilder() {
    return this.createQueryBuilder('moduleItem')
      .leftJoinAndSelect('moduleItem.module', 'module')
      .leftJoinAndSelect('moduleItem.questions', 'questions')
      .leftJoinAndSelect('questions.answers', 'answers');
  }
  async getModuleItems(type: ModuleItemType, modules: ModuleEntity[]) {
    const moduleIds = modules.map((module) => module.id);
    let queryBuilder = this.moduleItemsQueryBuilder().where('"moduleId" in (:...moduleIds)', {
      moduleIds,
    });

    if (type) {
      queryBuilder = queryBuilder.andWhere('moduleItem.type = :type', { type });
    }

    return queryBuilder.getMany();
  }

  async getModuleItem(itemId: string): Promise<ModuleItemEntity | undefined> {
    return this.moduleItemsQueryBuilder().where('moduleItem.id = :id', { id: itemId }).getOne();
  }

  async checkModuleItemExists(moduleId: string, title: string, type: ModuleItemType, excludeItem = '') {
    const queryBuilder = this.createQueryBuilder('moduleItem')
      .leftJoin('moduleItem.module', 'module')
      .where('LOWER(moduleItem.title) = LOWER(:title)', { title })
      .andWhere('module.id = :moduleId', { moduleId })
      .andWhere('moduleItem.id != :excludeItem', { excludeItem })
      .andWhere('moduleItem.type = :type', { type });

    return (await queryBuilder.getCount()) > 0;
  }
}
