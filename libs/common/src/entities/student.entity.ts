import UserEntity from './user.entity';
import { OneToMany } from 'typeorm';
import StudentCoursesEntity from './student.courses.entity';


export default class StudentEntity extends UserEntity {

  @OneToMany(() => StudentCoursesEntity, (studentCourse) => studentCourse.student)
  courses: Array<StudentCoursesEntity>;

}
