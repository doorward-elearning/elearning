import UserEntity from './user.entity';
import { OneToMany } from 'typeorm';
import CourseEntity from './course.entity';
import GroupEntity from './group.entity';

export default class TeacherEntity extends UserEntity {
  @OneToMany(() => CourseEntity, (course) => course.author)
  authoredCourses: Array<CourseEntity>;

  @OneToMany(() => GroupEntity, (group) => group.author)
  authoredGroups: Array<GroupEntity>;
}
