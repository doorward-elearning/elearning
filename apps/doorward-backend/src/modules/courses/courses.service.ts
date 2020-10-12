import { Injectable } from '@nestjs/common';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import CourseEntity from '@doorward/common/entities/course.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { CourseStatus } from '@doorward/common/types/courses';
import { ModulesService } from './modules/modules.service';
import UserEntity from '@doorward/common/entities/user.entity';
import { CreateCourseBody, UpdateCourseBody } from '@doorward/common/dtos/body/courses.body';
import { MeetingsService } from '../meetings/meetings.service';
import { MeetingRoomTypes, MeetingStatus } from '@doorward/common/types/meeting';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import { PaginationQuery } from '@doorward/common/dtos/query';
import { PaginatedEntities, PaginationMetaData } from '@doorward/common/dtos/response/base.response';

@Injectable()
export class CoursesService {
  constructor(
    private coursesRepository: CoursesRepository,
    private modulesService: ModulesService,
    private meetingsService: MeetingsService,
    private meetingRoomsService: MeetingRoomsService
  ) {}

  async createCourse(body: CreateCourseBody, author: UserEntity): Promise<CourseEntity> {
    const courseExists = await this.coursesRepository
      .createQueryBuilder('course')
      .where('LOWER(title) = LOWER(:title)', { title: body.title })
      .getOne();

    if (courseExists) {
      throw new ValidationException({ title: 'A {{course}} with this title already exists' });
    }
    const { modules, title } = body;

    // create the course
    let course = await this.coursesRepository.save(
      this.coursesRepository.create({
        title,
        status: CourseStatus.PUBLISHED,
        author,
      })
    );

    // create the modules
    await this.modulesService.createModules(course, ...modules);

    course = await this.coursesRepository.findOne(course.id, {
      relations: ['modules', 'author'],
    });

    return course;
  }

  async getCourses(user: UserEntity, page: PaginationQuery): Promise<PaginatedEntities<CourseEntity>> {
    if (user.isSuperAdmin()) {
      return this.getAllCourses(user, page);
    } else if (user.isTeacher()) {
      return this.getCoursesForAuthor(user, page);
    } else {
      return this.getCoursesForLearner(user, page);
    }
  }

  async getCoursesForLearner(student: UserEntity, page: PaginationQuery): Promise<PaginatedEntities<CourseEntity>> {
    return this.coursesRepository.getCoursesForStudent(student.id, page);
  }

  async getCoursesForAuthor(author: UserEntity, page: PaginationQuery): Promise<PaginatedEntities<CourseEntity>> {
    return this.coursesRepository.getCoursesByTeacher(author.id, true, page);
  }

  async getAllCourses(admin: UserEntity, page: PaginationQuery): Promise<PaginatedEntities<CourseEntity>> {
    return this.coursesRepository.getCoursesByAdmin(admin.id, page);
  }

  async getCourse(id: string) {
    return this.coursesRepository.getCourse(id);
  }

  async updateCourse(id: string, body: UpdateCourseBody, currentUser: UserEntity) {
    const existingCourse = await this.coursesRepository
      .createQueryBuilder('course')
      .where('LOWER(title) = LOWER(:title) AND id != :id', { title: body.title, id })
      .getOne();

    if (existingCourse) {
      throw new ValidationException({ title: 'A {{course}} with this title already exists.' });
    }

    await this.coursesRepository.update(id, {
      ...body,
    });

    return this.getCourse(id);
  }

  async deleteCourse(id: string) {
    await this.coursesRepository.softDelete(id);
  }

  async launchClassroom(id: string, user: UserEntity) {
    const course = await this.coursesRepository.findOne(id);
    let meeting;
    let meetingRoom = await this.coursesRepository.getMeetingRoomForCourse(id);

    if (!meetingRoom) {
      meetingRoom = await this.meetingRoomsService.createMeetingRoom(course.title, MeetingRoomTypes.PRIVATE);
      this.coursesRepository.update(course.id, { meetingRoom }).then();
    }

    if (meetingRoom.currentMeeting) {
      meeting = meetingRoom.currentMeeting;
    } else {
      meeting = await this.meetingsService.createMeeting(meetingRoom.id, MeetingStatus.STARTED);
    }

    return this.meetingsService.joinMeeting(meeting.id, user);
  }
}
