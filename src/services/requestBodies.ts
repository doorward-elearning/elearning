export type CourseModuleBody = {
  name: string;
};

export type CreateCourseBody = {
  title: string;
  description: string;
  modules: Array<CourseModuleBody>;
};
