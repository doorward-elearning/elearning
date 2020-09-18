import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@repositories/users.repository';
import { CreateUserBody } from '@doorward/common/dtos/body';
import { UsersService } from '../users/users.service';
import AccountWithPasswordEmail from './emails/account.with.password.email';
import om from '../../utils/om';
import FrontendLinks from '../../utils/frontend.links';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import NewAccountEmail from './emails/new.account.email';
import StudentCoursesRepository from '@repositories/student.courses.repository';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import CoursesRepository from '@repositories/courses.repository';

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

  public async createStudentInCourse(body: CreateUserBody, courseId: string, origin: string) {
    const student = await this.createStudent(body, origin);
    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['meetingRoom'],
    });

    await this.studentCourseRepository.addStudentToCourse(courseId, student.id);

    if (course.meetingRoom) {
      await this.meetingRoomsService.addToMeetingRoom(course.meetingRoom.id, student.id);
    }

    return student;
  }

  public async createStudent(body: CreateUserBody, origin: string) {
    const { user, resetToken } = await this.usersService.createUser(body);

    let email;
    if (body.password) {
      email = new AccountWithPasswordEmail({
        subject: om('A new {{student}} account has been created.'),
        data: {
          link: origin + FrontendLinks.login,
          password: body.password,
        },
        recipient: user,
      });
    } else {
      email = new NewAccountEmail({
        subject: om('A new {{student}} account has been created.'),
        data: {
          resetToken,
        },
        recipient: user,
      });
    }

    this.emailService.send(email);

    return user;
  }
}
