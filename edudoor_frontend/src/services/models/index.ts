export interface Model {
  id: number;
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
  organizationId: number;
  organization: Organization;
}

export interface User extends Model {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  zipCode?: string;
  country?: string;
  city?: string;
  organizationId: number;
  organization: Organization;
  roles: Array<Role>;
  authoredCourses: Array<Course>;
  status: string;
}

export interface Student extends User {
  courses: Array<Course>;
}

export interface Module extends Model {
  title: string;
  description?: string;
  courseId: number;
  course: Course;
}

export interface Course extends Model {
  title: string;
  description?: string;
  objectives?: string;
  requirements?: string;
  status: string;
  authorId: number;
  author: User;
  modules: Array<Module>;
}
