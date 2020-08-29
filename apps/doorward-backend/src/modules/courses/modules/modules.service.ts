import { Injectable } from '@nestjs/common';
import ModulesRepository from '../../../repositories/modules.repository';
import CreateModuleBody from '@doorward/common/dtos/create.module.body';
import CourseEntity from '@doorward/common/entities/course.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(private modulesRepository: ModulesRepository) {}

  async createModules(course: CourseEntity, ...modules: Array<CreateModuleBody>): Promise<Array<ModuleEntity>> {
    const modulesToCreate = modules.map((module) => this.modulesRepository.create({ title: module.title, course }));

    // save all the modules
    return this.modulesRepository.save(modulesToCreate);
  }

  async updateModules(course: CourseEntity, ...modules: Array) {

  }
}
