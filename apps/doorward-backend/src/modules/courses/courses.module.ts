import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ModulesModule } from './modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ItemsModule } from './modules/items/items.module';
import { ManagersModule } from './managers/managers.module';
import { DiscussionGroupsModule } from './discussion-groups/discussion-groups.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';

@Module({
  imports: [
    ModulesModule,
    ItemsModule,
    TypeOrmModule.forFeature([CoursesRepository, UsersRepository, ModuleItemsRepository]),
    ManagersModule,
    DiscussionGroupsModule,
    MeetingsModule,
    MeetingRoomsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
