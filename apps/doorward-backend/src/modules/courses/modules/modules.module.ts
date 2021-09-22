import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { ItemsModule } from './items/items.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AssessmentsModule } from './assessments/assessments.module';

@Module({
  imports: [ItemsModule, AssignmentsModule, AssessmentsModule],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
