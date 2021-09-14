import { Module } from '@nestjs/common';
import { SearchSuggestionsController } from './search-suggestions.controller';
import { SearchSuggestionsService } from './search-suggestions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, GroupsRepository,CoursesRepository])],
  controllers: [SearchSuggestionsController],
  providers: [SearchSuggestionsService],
  exports: [SearchSuggestionsService],
})
export class SearchSuggestionsModule {}
