import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ModulesModule } from './modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '../../repositories/courses.repository';
import { UsersRepository } from '@repositories/users.repository';
import ModuleItemsRepository from '@repositories/module.items.repository';
import { ItemsModule } from './modules/items/items.module';
import { ManagersModule } from './managers/managers.module';

@Module({
  imports: [
    ModulesModule,
    ItemsModule,
    TypeOrmModule.forFeature([CoursesRepository, UsersRepository, ModuleItemsRepository]),
    ManagersModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
