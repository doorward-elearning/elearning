import { EntityRepository } from 'typeorm';
import CourseEntity from '@doorward/common/entities/course.entity';
import OrganizationBasedRepository from './organization.based.repository';

@EntityRepository(CourseEntity)
export default class CoursesRepository extends OrganizationBasedRepository<CourseEntity> {
  public async getCoursesForStudent(studentId: string): Promise<CourseEntity[]> {
    return this.createQueryBuilder('course')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."courseId" = course.id')
      .where('"studentCourses"."studentId" = :studentId', { studentId })
      .getMany();
  }

  public async getCoursesByTeacher(teacherId: string) {
    return this.createQueryBuilder('course').where('course.authorId = :teacherId', { teacherId }).getMany();
  }
}
