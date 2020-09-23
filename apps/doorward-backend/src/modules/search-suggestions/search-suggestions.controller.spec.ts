import { Test, TestingModule } from '@nestjs/testing';
import { SearchSuggestionsController } from './search-suggestions.controller';

describe('SearchSuggestions Controller', () => {
  let controller: SearchSuggestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchSuggestionsController],
    }).compile();

    controller = module.get<SearchSuggestionsController>(SearchSuggestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
