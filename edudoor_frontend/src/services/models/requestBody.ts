export type CourseModuleBody = {
  title: string;
};

export type CreateCourseBody = {
  title: string;
  description: string;
  modules: Array<CourseModuleBody>;
};
