import { Injectable } from '@nestjs/common';
import ModulesRepository from '../../../repositories/modules.repository';
import CreateModuleBody from '@doorward/common/dtos/create.module.body';
import CourseEntity from '@doorward/common/entities/course.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

@Injectable()
export class ModulesService {
  constructor(private modulesRepository: ModulesRepository) {}

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

  async checkModuleExists(courseId: string, title: string): Promise<boolean> {
    return !!(await this.modulesRepository.findOne({
      where: {
        course: {
          id: courseId,
        },
        title,
      },
    }));
  }

  async createModule(course: { id: string }, body: CreateModuleBody): Promise<ModuleEntity> {
    if (await this.checkModuleExists(course.id, body.title)) {
      throw new ValidationException({ title: 'A module with this title already exists.' });
    }

    return await this.modulesRepository.create({
      course,
      title: body.title,
    });
  }

  async getModulesInCourse(course: { id: string }) {
    return this.modulesRepository.find({
      where: {
        course,
      },
      relations: ['items', 'items.questions', 'items.questions.answers'],
    });
  }
}
