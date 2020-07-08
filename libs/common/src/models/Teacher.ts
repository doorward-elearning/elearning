import { User } from '@doorward/common/models/User';
import { Course } from '@doorward/common/models/Course';

export interface Teacher extends User {
  authoredCourses: Array<Course>;
}
