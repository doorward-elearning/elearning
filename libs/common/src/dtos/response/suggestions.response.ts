import DApiResponse from '@doorward/common/dtos/response/base.response';
import { SearchSuggestion } from '@doorward/common/types/api';

export class SuggestionsResponse extends DApiResponse {
  suggestions: SearchSuggestion[];
}

