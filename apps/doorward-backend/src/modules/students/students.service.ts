import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@repositories/users.repository';
import { AddStudentsToCourseBody, CreateUserBody } from '@doorward/common/dtos/body';
import { UsersService } from '../users/users.service';
import StudentAccountWithPasswordEmail from '../../emails/student-account.with.password.email';
import om from '../../utils/om';
import FrontendLinks from '../../utils/frontend.links';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import StudentNewAccountEmail from '../../emails/student-new.account.email';
import StudentCoursesRepository from '@repositories/student.courses.repository';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import CoursesRepository from '@repositories/courses.repository';
import CourseEntity from '@doorward/common/entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private emailService: EmailsService,
    private studentCourseRepository: StudentCoursesRepository,
    private meetingRoomsService: MeetingRoomsService,
    private coursesRepository: CoursesRepository
  ) {}

  public async getStudentsInCourse(courseId: string) {
    return this.usersRepository
      .createQueryBuilder('student')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .where('"studentCourses"."courseId" = :courseId', { courseId })
      .getMany();
  }

  public async getStudentNotRegisteredInCourse(courseId: string) {
    return this.usersRepository
      .createQueryBuilder('student')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."studentId" = student.id')
      .having('SUM(CASE WHEN "studentCourses"."courseId" = :courseId THEN 1 ELSE 0 END) = 0', { courseId })
      .addGroupBy('student.id')
      .getMany();
  }

  public async createStudentInCourse(body: CreateUserBody, courseId: string, origin: string) {
    const student = await this.createStudent(body, origin);

    await this.studentCourseRepository.addStudentToCourse(courseId, student.id);

    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['meetingRoom'],
    });

    await this.addStudentToCourseMeetingRoom(course, student.id);

    return student;
  }

  public async addStudentToCourseMeetingRoom(course: CourseEntity, studentId: string) {
    if (course.meetingRoom) {
      await this.meetingRoomsService.addToMeetingRoom(course.meetingRoom.id, studentId);
    }
  }

  public async addStudentsToCourse(body: AddStudentsToCourseBody, courseId: string) {
    await this.studentCourseRepository.addStudentsToCourse(body.students, courseId);

    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['meetingRoom'],
    });

    Promise.all(body.students.map((studentId) => this.addStudentToCourseMeetingRoom(course, studentId)));

    return await this.usersRepository.findByIds(body.students);
  }

  public async createStudent(body: CreateUserBody, origin: string) {
    const { user, resetToken } = await this.usersService.createUser(body);

    let email;
    if (body.password) {
      email = new StudentAccountWithPasswordEmail({
        subject: om`A new {{student}} account has been created.'`,
        data: {
          link: origin + FrontendLinks.login,
          password: body.password,
        },
        recipient: user,
      });
    } else {
      email = new StudentNewAccountEmail({
        subject: om`A new {{student}} account has been created.'`,
        data: {
          link: origin + FrontendLinks.passwordReset(resetToken),
        },
        recipient: user,
      });
    }

    this.emailService.send(email);

    return user;
  }
}
