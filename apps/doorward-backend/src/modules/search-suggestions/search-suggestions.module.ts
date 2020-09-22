import { Module } from '@nestjs/common';
import { SearchSuggestionsController } from './search-suggestions.controller';
import { SearchSuggestionsService } from './search-suggestions.service';

@Module({
  controllers: [SearchSuggestionsController],
  providers: [SearchSuggestionsService]
})
export class SearchSuggestionsModule {}
