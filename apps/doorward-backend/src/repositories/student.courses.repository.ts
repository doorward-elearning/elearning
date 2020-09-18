import OrganizationBasedRepository from '../utils/organization.based.repository';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { EntityRepository } from 'typeorm';
import { StudentCourseStatus } from '@doorward/common/types/courses';

@EntityRepository(StudentCoursesEntity)
export default class StudentCoursesRepository extends OrganizationBasedRepository<StudentCoursesEntity> {
  async addStudentToCourse(courseId: string, studentId: string) {
    return this.save(
      this.create({
        student: {
          id: studentId,
        },
        course: {
          id: courseId,
        },
        status: StudentCourseStatus.ONGOING,
      })
    );
  }
}
