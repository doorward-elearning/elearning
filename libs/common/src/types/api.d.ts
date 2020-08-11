import { Icons } from '@doorward/ui/types/icons';

export interface ConferenceModuleStatistics {
  assignments: number;
  quizzes: number;
  pages: number;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface SearchSuggestion {
  text: string;
  image?: string;
  icon?: Icons;
}
