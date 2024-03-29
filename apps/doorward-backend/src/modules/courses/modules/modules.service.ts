import { Injectable } from '@nestjs/common';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import CourseEntity from '@doorward/common/entities/course.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { ItemsService } from './items/items.service';
import UserEntity from '@doorward/common/entities/user.entity';
import {
  CreateModuleBody,
  CreateModuleItemBody,
  UpdateModuleBody,
  UpdateModuleOrderBody,
  UpdateModulesBody,
} from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';

@Injectable()
export class ModulesService {
  constructor(private modulesRepository: ModulesRepository, private itemsService: ItemsService) {}

  async createModules(course: CourseEntity, ...modules: Array<CreateModuleBody>): Promise<Array<ModuleEntity>> {
    return (
      await Promise.all(
        modules.map(async (module) => {
          if (!(await this.checkModuleExists(course.id, module.title))) {
            return this.createModule(course, module);
          }
        })
      )
    ).filter((x) => !!x);
  }

  async checkModuleExists(courseId: string, title: string, excludeModule?: string): Promise<boolean> {
    let queryBuilder = this.modulesRepository
      .createQueryBuilder('module')
      .leftJoin('module.course', 'course')
      .where('LOWER(module.title) = LOWER(:title)', { title })
      .andWhere('module.course.id = :courseId', { courseId });

    if (excludeModule) {
      queryBuilder = queryBuilder.andWhere('module.id != :id', { id: excludeModule });
    }

    return (await queryBuilder.getCount()) > 0;
  }

  async createModule(course: { id: string }, body: CreateModuleBody): Promise<ModuleEntity> {
    if (await this.checkModuleExists(course.id, body.title)) {
      throw new ValidationException({ title: translate('moduleWithThisTitleAlreadyExists') });
    }

    return await this.modulesRepository.save(
      this.modulesRepository.create({
        course,
        title: body.title,
      })
    );
  }

  async getModulesInCourse(course: { id: string }) {
    return this.modulesRepository.find({
      where: {
        course,
      },
      relations: ['items', 'items.questions', 'items.questions.answers'],
    });
  }

  async updateModule(moduleId: string, body: UpdateModuleBody): Promise<ModuleEntity> {
    const module = await this.modulesRepository.findOne(moduleId, { relations: ['course'] });

    if (await this.checkModuleExists(module.courseId, body.title, module.id)) {
      throw new ValidationException({ title: translate('moduleWithThisTitleAlreadyExists') });
    }

    module.title = body.title;
    await this.modulesRepository.save(module);

    return module;
  }

  async deleteModule(moduleId: string) {
    await this.modulesRepository.delete(moduleId);
  }

  async getModule(moduleId: string) {
    return this.modulesRepository.findOne(moduleId, {
      relations: ['items'],
    });
  }

  async createModuleItem(moduleId: string, body: CreateModuleItemBody, author: UserEntity) {
    return this.itemsService.createOrUpdateModuleItem(moduleId, body, author);
  }

  async updateModuleItems(module: UpdateModuleOrderBody) {
    return Promise.all(
      module.items.map(async (item) => {
        await this.itemsService.updateModuleItemOrder(module.id, item);
        return item;
      })
    );
  }

  async updateModules(body: UpdateModulesBody) {
    return Promise.all(
      body.modules.map(async (module) => {
        await this.modulesRepository.update(module.id, {
          order: module.order,
        });
        await this.updateModuleItems(module);
        return module;
      })
    );
  }
}
