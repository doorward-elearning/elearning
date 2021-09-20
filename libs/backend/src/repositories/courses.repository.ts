import { EntityRepository } from 'typeorm';
import _ from 'lodash';
import CourseEntity from '@doorward/common/entities/course.entity';
import OrganizationBasedRepository from './organization.based.repository';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';
import { MeetingStatus } from '@doorward/common/types/meeting';
import { PaginationQuery } from '@doorward/common/dtos/query';
import { PaginatedEntities } from '@doorward/common/dtos/response/base.response';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';

@EntityRepository(CourseEntity)
export default class CoursesRepository extends OrganizationBasedRepository<CourseEntity> {
  public async getCoursesForStudent(
    studentId: string,
    page: PaginationQuery,
    search?: string
  ): Promise<PaginatedEntities<CourseEntity>> {
    const queryBuilder = this.createQueryBuilder('course')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."courseId" = course.id')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .where('"studentCourses"."studentId" = :studentId', { studentId });

    return this.paginate(queryBuilder, page);
  }

  public async getCoursesByTeacher(teacherId: string, includeManaged = true, page: PaginationQuery) {
    const queryBuilder = await this.createQueryBuilder('course')
      .where('course."createdBy" = :teacherId', { teacherId })
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom');
    if (includeManaged) {
      const managedCourses = (await this.getCoursesManagedByTeacher(teacherId)).map((course) => course.id);

      if (managedCourses.length) {
        queryBuilder.orWhere('course.id IN (:...managedCourses)', { managedCourses });
      }
    }

    const { entities, pagination } = await this.paginate(queryBuilder, page);

    return {
      entities: await this.getCoursesNumStudents(entities),
      pagination,
    };
  }

  public async getCoursesManagedByTeacher(teacherId: string, exclude: Array<string> = []) {
    const queryBuilder = this.createQueryBuilder('course')
      .innerJoin('CourseManagers', 'manager', 'manager."courseId" = course.id')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom');
    if (exclude.length) {
      queryBuilder.where('course.id NOT IN (:...exclude)', { exclude });
    }

    queryBuilder.where('manager."managerId" = :teacherId', { teacherId });

    return queryBuilder.getMany();
  }

  public async getCoursesByAdmin(adminId: string, page: PaginationQuery, search ?: string) {
    const queryBuilder = await this.createSearchQueryBuilder('course', ['title','id'], search)
      .leftJoinAndSelect('course.author', 'author')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .addOrderBy('course.createdAt', 'DESC');

    const { entities, pagination } = await this.paginate(queryBuilder, page);

    return {
      entities: await this.getCoursesNumStudents(entities),
      pagination,
    };
  }

  public async getCoursesNumStudents(courses: Array<CourseEntity>): Promise<Array<CourseEntity>> {
    return Promise.all(
      courses.map(async (course) => {
        course.numStudents = await this.getRepository(StudentCoursesEntity).count({ course: { id: course.id } });
        return course;
      }),
    );
  }

  public async getCourse(courseId: string) {
    const course = await this.createQueryBuilder('course')
      .where('course.id = :courseId', { courseId })
      .leftJoinAndSelect('course.author', 'author')
      .leftJoinAndSelect('course.modules', 'module')
      .leftJoinAndSelect('module.items', 'items')
      .leftJoinAndSelect('items.file', 'file')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .leftJoin('StudentCourses', 'studentCourse', '"studentCourse"."courseId" = :courseId', { courseId })
      .leftJoinAndMapMany('course.students', 'Users', 'student', 'student.id = "studentCourse"."studentId"')
      .leftJoin('CourseManagers', 'courseManager', '"courseManager"."courseId" = course.id')
      .leftJoinAndMapMany('course.managers', 'Users', 'manager', 'manager.id = "courseManager"."managerId"')
      .getOne();

    course.numStudents = await this.getRepository(StudentCoursesEntity).count({ course: { id: course.id } });

    course.modules = course.modules.sort((a, b) => a.order - b.order);

    course.modules.forEach((module) => {
      module.items = module.items.sort((a, b) => a.order - b.order);
    });

    course.itemsCount = await this.countModuleItems(courseId);

    return course;
  }

  public async getMeetingRoomForCourse(courseId: string): Promise<MeetingRoomEntity> {
    return this.getRepository(MeetingRoomEntity)
      .createQueryBuilder('meetingRoom')
      .innerJoin('Courses', 'course', '"meetingRoom".id = course."meetingRoomId" AND course.id = :courseId', {
        courseId,
      })
      .leftJoinAndSelect(
        'Meetings',
        'currentMeeting',
        '"meetingRoom".id = "currentMeeting"."meetingRoomId" AND' + ' "currentMeeting".status = :status',
        { status: MeetingStatus.STARTED },
      )
      .getOne();
  }

  public async countModuleItems(courseId: string) {
    const queryResult = await this.getRepository(ModuleItemEntity)
      .createQueryBuilder('moduleItem')
      .leftJoin('moduleItem.module', 'module')
      .where('module."courseId" = :courseId', { courseId })
      .andWhere('moduleItem.type != :assessment', { assessment: ModuleItemType.ASSESSMENT })
      .select('COUNT("moduleItem".id)')
      .addSelect('"moduleItem".type')
      .addGroupBy('"moduleItem".type')
      .getRawMany<{ count: number; type: ModuleItemType }>();

    const assessmentQuery = await this.getRepository(ModuleItemEntity)
      .createQueryBuilder('moduleItem')
      .leftJoin('moduleItem.module', 'module')
      .where('module."courseId" = :courseId', { courseId })
      .andWhere('moduleItem.type = :assessment', { assessment: ModuleItemType.ASSESSMENT })
      .select('COUNT("moduleItem".id)')
      .addSelect('"moduleItem"."assessmentType"')
      .addGroupBy('"moduleItem"."assessmentType"')
      .getRawMany<{ count: number; assessmentType: AssessmentTypes }>();

    const count = _.chain(queryResult.map((row) => ({ ...row, count: +row.count })))
      .keyBy('type')
      .mapValues('count')
      .value();

    const assessments = _.chain(assessmentQuery.map((row) => ({ ...row, count: +row.count })))
      .keyBy('assessmentType')
      .mapValues('count')
      .value();

    return { ...count, ...assessments };
  }
  public async getAllCourseNames() : Promise<Array <string>>{
    const courses = await this.createQueryBuilder('course').getMany();
        return courses.map(function(course)
        {
             return course.title;
        });
    }
}
