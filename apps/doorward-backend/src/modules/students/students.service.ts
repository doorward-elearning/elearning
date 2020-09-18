import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@repositories/users.repository';

@Injectable()
export class StudentsService {
  constructor(private usersRepository: UsersRepository) {}

  public async getStudentsInCourse(courseId: string) {
    return this.usersRepository
      .createQueryBuilder('student')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .where('"studentCourses"."courseId" = :courseId', { courseId })
      .getMany();
  }
}
