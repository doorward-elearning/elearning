export interface Model {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
export interface Organization extends Model {
  name: string;
  description?: string;
}

export interface Role extends Model {
  name: string;
  description?: string;
  organizationId: string;
  organization: Organization;
}

export interface User extends Model {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  country: string;
  fullName: string;
  city: string;
  organizationId: string;
  organization: Organization;
  roles: Array<Role>;
  status: string;
}

export interface Student extends User {
  courses: Array<Course>;
  coursesInProgress: Array<Course>;
}

export interface CourseCreator extends User {
  authoredCourses: Array<Course>;
}

export interface Module extends Model {
  title: string;
  description?: string;
  courseId: string;
  course: Course;
  items: Array<ModuleItem>;
}

export type ModuleItemTypes = 'Page' | 'Assignment' | 'File' | 'Discussion Forum';

export interface ModuleItem extends Model {
  title: string;
  content: any;
  type: ModuleItemTypes;
}

export interface Course extends Model {
  title: string;
  description?: string;
  objectives?: string;
  requirements?: string;
  status: string;
  authorId: string;
  author: User;
  modules: Array<Module>;
}
