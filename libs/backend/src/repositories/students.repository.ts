import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { EntityRepository } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';
import { PaginationQuery } from '@doorward/common/dtos/query';

@EntityRepository(UserEntity)
export class StudentsRepository extends UsersRepository {
  /**
   *
   * @param courseId
   */
  public async getStudentsInCourse(courseId: string): Promise<UserEntity[]> {
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

  /**
   *
   */
  public async getAll() {
    return this.getUsersByRole(Roles.STUDENT);
  }

  public async getAllStudents(search?: string, page?: PaginationQuery) {
    const queryBuilder = this.createSearchQueryBuilder(
      'student',
      ['firstName', 'username', 'email', 'lastName'],
      search
    )
      .innerJoin('student.role', 'role')
      .where('role.name = :role', { role: Roles.STUDENT });

    return this.paginate(queryBuilder, page);
  }

  public async getStudentAndCourses(studentId: string) {
    return this.createQueryBuilder('student')
      .where('student.id = :studentId', { studentId })
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .leftJoinAndMapMany('student.courses', 'Courses', 'course', 'course.id = "studentCourses"."courseId"')
      .leftJoinAndSelect('student.createdBy', 'createdBy')
      .getOne();
  }

  public async getStudentsAndCourses() {
    return this.createQueryBuilder('student')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .leftJoinAndMapMany('student.courses', 'Courses', 'course', 'course.id = "studentCourses"."courseId"')
      .leftJoinAndSelect('student.createdBy', 'createdBy')
      .getMany();
  }
}
