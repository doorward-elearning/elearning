import UserEntity from './user.entity';
import StudentCoursesEntity from './student.courses.entity';

export default class StudentEntity extends UserEntity {
  courses: Array<StudentCoursesEntity>;
}
