import { User } from '@doorward/common/models/User';
import { Course } from '@doorward/common/models/Course';

export interface Student extends User {
  courses: Array<Course>;
  coursesInProgress: Array<Course>;
}