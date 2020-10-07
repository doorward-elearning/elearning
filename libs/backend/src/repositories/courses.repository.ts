import { EntityRepository } from 'typeorm';
import _ from 'lodash';
import CourseEntity from '@doorward/common/entities/course.entity';
import OrganizationBasedRepository from './organization.based.repository';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';
import { MeetingStatus } from '@doorward/common/types/meeting';

@EntityRepository(CourseEntity)
export default class CoursesRepository extends OrganizationBasedRepository<CourseEntity> {
  public async getCoursesForStudent(studentId: string): Promise<CourseEntity[]> {
    return this.createQueryBuilder('course')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."courseId" = course.id')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .where('"studentCourses"."studentId" = :studentId', { studentId })
      .getMany();
  }

  public async getCoursesByTeacher(teacherId: string, includeManaged = true) {
    const courses = await this.createQueryBuilder('course')
      .where('course."createdBy" = :teacherId', { teacherId })
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .getMany();
    if (includeManaged) {
      const managedCourses = await this.getCoursesManagedByTeacher(
        teacherId,
        courses.map((course) => course.id)
      );

      courses.push(...managedCourses);
    }

    return this.getCoursesNumStudents(courses);
  }

  public async getCoursesManagedByTeacher(teacherId: string, exclude: Array<string> = []) {
    const queryBuilder = this.createQueryBuilder('course')
      .innerJoin('CourseManagers', 'manager', 'manager."courseId" = course.id')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom');
    if (exclude.length) {
      queryBuilder.where('course.id NOT IN (:...exclude)', { exclude });
    }

    return queryBuilder.where('manager."managerId" = :teacherId', { teacherId }).getMany();
  }

  public async getCoursesByAdmin(adminId: string) {
    const courses = await this.createQueryBuilder('course')
      .leftJoinAndSelect('course.author', 'author')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .getMany();

    return this.getCoursesNumStudents(courses);
  }

  public async getCoursesNumStudents(courses: Array<CourseEntity>): Promise<Array<CourseEntity>> {
    return Promise.all(
      courses.map(async (course) => {
        course.numStudents = await this.getRepository(StudentCoursesEntity).count({ course: { id: course.id } });
        return course;
      })
    );
  }

  public async getCourse(courseId: string) {
    const course = await this.createQueryBuilder('course')
      .where('course.id = :courseId', { courseId })
      .leftJoinAndSelect('course.author', 'author')
      .leftJoinAndSelect('course.modules', 'module')
      .leftJoinAndSelect('module.items', 'items')
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
        { status: MeetingStatus.STARTED }
      )
      .getOne();
  }

  public async countModuleItems(courseId: string): Promise<Partial<Record<ModuleItemType, number>>> {
    const queryResult = await this.getRepository(ModuleItemEntity)
      .createQueryBuilder('moduleItem')
      .leftJoin('moduleItem.module', 'module')
      .where('module."courseId" = :courseId', { courseId })
      .select('COUNT("moduleItem".id)')
      .addSelect('"moduleItem".type')
      .addGroupBy('"moduleItem".type')
      .getRawMany<{ count: number; type: ModuleItemType }>();

    return _.chain(queryResult.map((row) => ({ ...row, count: +row.count })))
      .keyBy('type')
      .mapValues('count')
      .value();
  }
}
