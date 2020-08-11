import { User } from '@doorward/common/models/User';
import { Course } from '@doorward/common/models/Course';

export interface Moderator extends User {
  authoredCourses: Array<Course>;
}
