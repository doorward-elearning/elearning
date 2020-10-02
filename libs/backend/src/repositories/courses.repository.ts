import { EntityRepository } from 'typeorm';
import _ from 'lodash';
import CourseEntity from '@doorward/common/entities/course.entity';
import OrganizationBasedRepository from './organization.based.repository';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

@EntityRepository(CourseEntity)
export default class CoursesRepository extends OrganizationBasedRepository<CourseEntity> {
  public async getCoursesForStudent(studentId: string): Promise<CourseEntity[]> {
    return this.createQueryBuilder('course')
      .leftJoin('StudentCourses', 'studentCourses', '"studentCourses"."courseId" = course.id')
      .where('"studentCourses"."studentId" = :studentId', { studentId })
      .getMany();
  }

  public async getCoursesByTeacher(teacherId: string) {
    return this.createQueryBuilder('course').where('course.authorId = :teacherId', { teacherId }).getMany();
  }

  public async getCoursesByAdmin(adminId: string) {
    const courses = await this.createQueryBuilder('course')
      .leftJoinAndSelect('course.author', 'author')
      .leftJoinAndSelect('course.meetingRoom', 'meetingRoom')
      .getMany();

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
