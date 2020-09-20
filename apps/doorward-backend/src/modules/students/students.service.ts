import { Injectable } from '@nestjs/common';
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
import { StudentsRepository } from '@repositories/students.repository';

/**
 *
 */
@Injectable()
export class StudentsService {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersService: UsersService,
    private emailService: EmailsService,
    private studentCourseRepository: StudentCoursesRepository,
    private meetingRoomsService: MeetingRoomsService,
    private coursesRepository: CoursesRepository
  ) {}

  /**
   *
   * @param studentId
   */
  public async getStudentById(studentId: string) {
    return this.studentsRepository.findStudentById(studentId);
  }

  /**
   *
   * @param courseId
   */
  public async getStudentsInCourse(courseId: string) {
    return this.studentsRepository.getStudentsInCourse(courseId);
  }

  /**
   *
   * @param courseId
   * @param search
   */
  public async getStudentNotRegisteredInCourse(courseId: string, search?: string) {
    return this.studentsRepository.getStudentNotRegisteredInCourse(courseId, search);
  }

  /**
   *
   * @param body
   * @param courseId
   * @param origin
   */
  public async createStudentInCourse(body: CreateUserBody, courseId: string, origin: string) {
    const student = await this.createStudent(body, origin);

    await this.studentCourseRepository.addStudentToCourse(courseId, student.id);

    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['meetingRoom'],
    });

    await this.addStudentToCourseMeetingRoom(course, student.id);

    return student;
  }

  /**
   *
   * @param course
   * @param studentId
   */
  public async addStudentToCourseMeetingRoom(course: CourseEntity, studentId: string) {
    if (course.meetingRoom) {
      await this.meetingRoomsService.addToMeetingRoom(course.meetingRoom.id, studentId);
    }
  }

  /**
   *
   * @param body
   * @param courseId
   */
  public async addStudentsToCourse(body: AddStudentsToCourseBody, courseId: string) {
    await this.studentCourseRepository.addStudentsToCourse(body.students, courseId);

    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['meetingRoom'],
    });

    Promise.all(body.students.map((studentId) => this.addStudentToCourseMeetingRoom(course, studentId))).then();

    return await this.studentsRepository.findByIds(body.students);
  }

  /**
   *
   * @param body
   * @param origin
   */
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

    this.emailService.send(email).then();

    return user;
  }

  public async unEnrollStudentFromCourse(studentId: string, courseId: string) {
    const course = await this.coursesRepository.findOne(courseId, { relations: ['meetingRoom'] });
    await this.studentCourseRepository.softDelete({
      student: { id: studentId },
      course: { id: courseId },
    });

    if (course.meetingRoom) {
      this.meetingRoomsService.removeFromMeetingRoom(course.meetingRoom.id, studentId).then();
    }

    return await this.getStudentById(studentId);
  }
}
