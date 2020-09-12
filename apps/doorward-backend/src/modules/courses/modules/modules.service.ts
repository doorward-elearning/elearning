import { Injectable } from '@nestjs/common';
import ModulesRepository from '../../../repositories/modules.repository';
import CreateModuleBody from '@doorward/common/dtos/create.module.body';
import CourseEntity from '@doorward/common/entities/course.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import UpdateModuleBody from '@doorward/common/dtos/update.module.body';
import CreateModuleItemBody from '@doorward/common/dtos/create.module.item.body';
import { ItemsService } from './items/items.service';
import UserEntity from '@doorward/common/entities/user.entity';

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
      throw new ValidationException({ title: 'A {{module}} with this title already exists.' });
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

    if (await this.checkModuleExists(module.course.id, body.title, module.id)) {
      throw new ValidationException({ title: 'A {{module}} with this title already exists' });
    }

    module.title = body.title;
    await this.modulesRepository.save(module);

    return module;
  }

  async deleteModule(moduleId: string) {
    await this.modulesRepository.softDelete(moduleId);
  }

  async getModule(moduleId: string) {
    return this.modulesRepository.findOne(moduleId, {
      relations: ['items'],
    });
  }

  async createModuleItem(moduleId: string, body: CreateModuleItemBody, author: UserEntity) {
    return this.itemsService.createOrUpdateModuleItem(moduleId, body, author);
  }
}
