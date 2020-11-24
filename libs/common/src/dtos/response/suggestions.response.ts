import DApiResponse from '@doorward/common/dtos/response/base.response';
import { SearchSuggestion } from '@doorward/common/types/api';
import { Expose } from 'class-transformer';

export class SuggestionsResponse extends DApiResponse {
  @Expose()
  suggestions: SearchSuggestion[];
}
