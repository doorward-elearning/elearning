import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ModulesModule } from './modules/modules.module';
import { ItemsModule } from './modules/items/items.module';
import { ManagersModule } from './managers/managers.module';
import { DiscussionGroupsModule } from './discussion-groups/discussion-groups.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';

@Module({
  imports: [
    ModulesModule,
    ItemsModule,
    ,
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
