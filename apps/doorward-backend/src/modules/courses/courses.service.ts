import { Injectable } from '@nestjs/common';
import CoursesRepository from '../../repositories/courses.repository';
import CreateCourseBody from '@doorward/common/dtos/create.course.body';
import CourseEntity from '@doorward/common/entities/course.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { CourseStatus } from '@doorward/common/types/courses';
import { ModulesService } from './modules/modules.service';
import UserEntity from '@doorward/common/entities/user.entity';
import UpdateCourseBody from '@doorward/common/dtos/update.course.body';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository, private modulesService: ModulesService) {}

  async createCourse(body: CreateCourseBody, author: UserEntity): Promise<CourseEntity> {
    const courseExists = await this.coursesRepository
      .createQueryBuilder('course')
      .where('LOWER(title) = LOWER(:title)', { title: body.title })
      .getOne();

    if (courseExists) {
      throw new ValidationException({ title: 'Course with this title already exists' });
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

  async getCourses(user: UserEntity): Promise<CourseEntity[]> {
    if (user.isSuperAdmin()) {
      return this.getCoursesForAdmin(user);
    } else if (user.isTeacher()) {
      return this.getCoursesForTeacher(user);
    } else {
      return this.getCoursesForStudent(user);
    }
  }

  async getCoursesForStudent(student: UserEntity): Promise<CourseEntity[]> {
    const courses = await this.coursesRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('StudentCourses', 'courseStudents', '"courseStudents"."courseId" = "course".id')
      .where('"courseStudents"."studentId" = :studentId', { studentId: student.id })
      .getMany();

    return this.coursesRepository.findByIds(
      courses.map((course) => course.id),
      {
        relations: ['author', 'meetingRoom'],
        order: {
          createdAt: 'DESC',
        },
      }
    );
  }

  async getCoursesForTeacher(teacher: UserEntity): Promise<CourseEntity[]> {
    return await this.coursesRepository.find({
      where: {
        author: {
          id: teacher.id,
        },
      },
      relations: ['author', 'meetingRoom'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getCoursesForAdmin(admin: UserEntity): Promise<CourseEntity[]> {
    return this.coursesRepository.find({
      relations: ['author', 'meetingRoom'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getCourse(id: string) {
    return this.coursesRepository.findOne(id, {
      relations: ['author', 'modules', 'students', 'students.student', 'managers', 'meetingRoom', 'managers.manager'],
    });
  }

  async updateCourse(id: string, body: UpdateCourseBody, currentUser: UserEntity) {
    const existingCourse = await this.coursesRepository
      .createQueryBuilder('course')
      .where('LOWER(title) = LOWER(:title) AND id != :id', { title: body.title, id })
      .getOne();

    if (existingCourse) {
      throw new ValidationException({ title: 'A course with this title already exists.' });
    }

    await this.coursesRepository.update(id, {
      ...body,
    });

    return this.getCourse(id);
  }

  async deleteCourse(id: string) {
    await this.coursesRepository.softDelete(id);
  }
}