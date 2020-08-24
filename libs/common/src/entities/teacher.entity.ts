import UserEntity from './user.entity';
import CourseEntity from './course.entity';
import GroupEntity from './group.entity';

export default class TeacherEntity extends UserEntity {
  authoredCourses: Array<CourseEntity>;

  authoredGroups: Array<GroupEntity>;
}
