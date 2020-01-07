import { User } from '@edudoor/common/models/User';
import { Course } from '@edudoor/common/models/Course';

export interface Student extends User {
  courses: Array<Course>;
  coursesInProgress: Array<Course>;
}
