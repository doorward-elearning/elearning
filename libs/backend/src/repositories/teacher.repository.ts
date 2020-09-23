import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { EntityRepository } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';
import { Roles } from '@doorward/common/types/roles';

@EntityRepository(UserEntity)
export default class TeacherRepository extends UsersRepository {
  public async getAll() {
    return this.getUsersByRole(Roles.TEACHER);
  }

  public async getTeacherById(teacherId: string) {
    return this.userExistsByRole(teacherId, Roles.TEACHER);
  }

  /**
   *
   * @param teacherId
   */
  public async getTeacherAndCourses(teacherId: string): Promise<UserEntity> {
    return this.createQueryBuilder('teacher')
      .where('teacher.id = :teacherId', { teacherId })
      .leftJoinAndMapMany('teacher.courses', 'Courses', 'course', 'course."createdBy" = teacher.id')
      .leftJoinAndSelect('teacher.createdBy', 'createdBy')
      .getOne();
  }

  /**
   *
   */
  public async getTeachersAndCourses(): Promise<UserEntity[]> {
    return this.createQueryBuilder('teacher')
      .leftJoinAndMapMany('teacher.courses', 'Courses', 'course', 'course."createdBy" = teacher.id')
      .leftJoinAndSelect('teacher.createdBy', 'createdBy')
      .getMany();
  }
}
