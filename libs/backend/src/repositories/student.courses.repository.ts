import MultiOrganizationRepository from './multi.organization.repository';
import { FindConditions, ObjectType } from 'typeorm';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { StudentCourseStatus } from '@doorward/common/types/courses';

export default class StudentCoursesRepository extends MultiOrganizationRepository<StudentCoursesEntity> {

  getEntity(): ObjectType<StudentCoursesEntity> {
    return StudentCoursesEntity;
  }

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
