import { Module } from '@nestjs/common';
import { SearchSuggestionsController } from './search-suggestions.controller';
import { SearchSuggestionsService } from './search-suggestions.service';

@Module({
  imports: [],
  controllers: [SearchSuggestionsController],
  providers: [SearchSuggestionsService],
  exports: [SearchSuggestionsService],
})
export class SearchSuggestionsModule {}
