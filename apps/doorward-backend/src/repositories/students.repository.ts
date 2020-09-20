import { UsersRepository } from '@repositories/users.repository';
import { EntityRepository } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';

@EntityRepository(UserEntity)
export class StudentsRepository extends UsersRepository {
  /**
   *
   * @param courseId
   */
  public async getStudentsInCourse(courseId: string) {
    return this.createQueryBuilder('student')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .where('"studentCourses"."courseId" = :courseId', { courseId })
      .getMany();
  }

  /**
   *
   * @param courseId
   * @param search
   */
  public async getStudentNotRegisteredInCourse(courseId: string, search?: string) {
    return this.createSearchQueryBuilder('student', ['firstName', 'lastName', 'email', 'username'], search)
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .having('SUM(CASE WHEN "studentCourses"."courseId" = :courseId THEN 1 ELSE 0 END) = 0', { courseId })
      .addGroupBy('student.id')
      .getMany();
  }

  /**
   *
   * @param studentId
   */
  public async findStudentById(studentId: string) {
    return this.userExistsByRole(studentId, Roles.STUDENT);
  }
}
