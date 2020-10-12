import OrganizationBasedRepository from './organization.based.repository';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { EntityRepository, FindConditions } from 'typeorm';
import { StudentCourseStatus } from '@doorward/common/types/courses';

@EntityRepository(StudentCoursesEntity)
export default class StudentCoursesRepository extends OrganizationBasedRepository<StudentCoursesEntity> {
  async courseHasStudent(
    courseId: string,
    studentId: string,
    status?: StudentCourseStatus
  ): Promise<StudentCoursesEntity> {
    const where: FindConditions<StudentCoursesEntity> = {
      student: {
        id: studentId,
      },
      course: {
        id: courseId,
      },
    };
    if (status) {
      where.status = status;
    }
    return await this.findOne({ where });
  }
  async addStudentToCourse(courseId: string, studentId: string) {
    const studentCourse = await this.courseHasStudent(courseId, studentId);

    return (
      studentCourse ||
      this.save(
        this.create({
          student: {
            id: studentId,
          },
          course: {
            id: courseId,
          },
          status: StudentCourseStatus.ONGOING,
        }),
        {
          transaction: false,
        }
      )
    );
  }

  async addStudentsToCourse(students: Array<string>, courseId: string) {
    return Promise.all(students.map(async (studentId) => this.addStudentToCourse(courseId, studentId)));
  }
}
