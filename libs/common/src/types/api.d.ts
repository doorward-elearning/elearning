export interface CourseModuleStatistics {
  assignments: number;
  quizzes: number;
  pages: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}
