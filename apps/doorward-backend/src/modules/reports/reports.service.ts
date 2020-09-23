import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '@doorward/backend/repositories/students.repository';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import { StudentReport, TeacherReport } from '@doorward/common/dtos/response/reports.responses';

@Injectable()
export class ReportsService {
  constructor(
    private studentsRepository: StudentsRepository,
    private teachersRepository: TeacherRepository,
    private courseRepository: CoursesRepository
  ) {}

  /**
   *
   */
  public async studentsReport(): Promise<StudentReport[]> {
    const students = await this.studentsRepository.getStudentsAndCourses();

    return await Promise.all(
      students.map(async (student) => {
        return new StudentReport(student);
      })
    );
  }

  /**
   *
   */
  public async teachersReport(): Promise<TeacherReport[]> {
    const teachers = await this.teachersRepository.getTeachersAndCourses();

    return await Promise.all(teachers.map(async (teacher) => new TeacherReport(teacher)));
  }

  /**
   *
   * @param studentId
   */
  public async getStudentReport(studentId: string): Promise<StudentReport> {
    const student = await this.studentsRepository.getStudentAndCourses(studentId);
    return new StudentReport(student);
  }

  /**
   *
   * @param teacherId
   */
  public async getTeacherReport(teacherId: string): Promise<TeacherReport> {
    const teacher = await this.teachersRepository.getTeacherAndCourses(teacherId);

    return new TeacherReport(teacher);
  }
}
