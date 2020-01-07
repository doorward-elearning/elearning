import { User } from '@edudoor/common/models/User';
import { Course } from '@edudoor/common/models/Course';

export interface Teacher extends User {
  authoredCourses: Array<Course>;
}
