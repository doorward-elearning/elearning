import { Injectable } from '@nestjs/common';
import ModuleItemsRepository from '@repositories/module.items.repository';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModulesRepository from '@repositories/modules.repository';

@Injectable()
export class ItemsService {
  constructor(private itemsRepository: ModuleItemsRepository, private modulesRepository: ModulesRepository) {}

  async getModuleItemsForCourse(course: { id: string }, type: ModuleItemType) {
    const modules = await this.modulesRepository.find({ course });
    let queryBuilder = this.itemsRepository
      .createQueryBuilder('moduleItem')
      .leftJoinAndSelect('moduleItem.module', 'module')
      .leftJoinAndSelect('moduleItem.assignmentSubmission', 'assignmentSubmission')
      .where('"moduleId" in (:...moduleIds)', { moduleIds: modules.map((module) => module.id) });

    if (type) {
      queryBuilder = queryBuilder.andWhere('type = :type', { type });
    }

    return queryBuilder.getMany();
  }
}
