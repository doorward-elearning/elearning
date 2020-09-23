import { Test, TestingModule } from '@nestjs/testing';
import { SearchSuggestionsService } from './search-suggestions.service';

describe('SearchSuggestionsService', () => {
  let service: SearchSuggestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchSuggestionsService],
    }).compile();

    service = module.get<SearchSuggestionsService>(SearchSuggestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
