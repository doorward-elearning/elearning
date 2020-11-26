import DApiResponse from '@doorward/common/dtos/response/base.response';
import UserEntity from '@doorward/common/entities/user.entity';
import CourseEntity from '@doorward/common/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StudentReport {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  creatorId: string;

  @Expose()
  creatorName: string;

  @Expose()
  courses: CourseEntity[];

  constructor(student: UserEntity) {
    this.id = student.id;
    this.username = student.username;
    this.fullName = student.fullName;
    this.creatorId = student.createdBy?.id;
    this.creatorName = student.createdBy?.fullName;
    this.courses = student.courses;
  }
}

export class TeacherReport extends StudentReport {
}

export class StudentReportResponse extends DApiResponse {
  student: StudentReport;
}

export class StudentsReportResponse extends DApiResponse {
  students: StudentReport[];
}

export class TeacherReportResponse extends DApiResponse {
  teacher: TeacherReport;
}

export class TeachersReportResponse extends DApiResponse {
  teachers: TeacherReport[];
}
