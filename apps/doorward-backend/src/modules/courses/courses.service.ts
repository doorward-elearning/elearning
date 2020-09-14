import { Injectable } from '@nestjs/common';
import CoursesRepository from '../../repositories/courses.repository';
import CourseEntity from '@doorward/common/entities/course.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { CourseStatus } from '@doorward/common/types/courses';
import { ModulesService } from './modules/modules.service';
import UserEntity from '@doorward/common/entities/user.entity';
import { CreateCourseBody, UpdateCourseBody } from '@doorward/common/dtos/body';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository, private modulesService: ModulesService) {}

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

  async getCourses(user: UserEntity): Promise<CourseEntity[]> {
    let courses = [];
    if (await user.hasPrivileges('courses.view-all')) {
      courses = await this.getAllCourses(user);
    } else {
      if (await user.hasPrivileges('courses.create')) {
        courses.push(...(await this.getCoursesForAuthor(user)));
      }
      if (await user.hasPrivileges('courses.read')) {
        courses.push(...(await this.getCoursesForLearner(user)));
      }
    }
    return courses;
  }

  async getCoursesForLearner(student: UserEntity): Promise<CourseEntity[]> {
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

  async getCoursesForAuthor(author: UserEntity): Promise<CourseEntity[]> {
    return await this.coursesRepository.find({
      where: {
        author: {
          id: author.id,
        },
      },
      relations: ['author', 'meetingRoom'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getAllCourses(admin: UserEntity): Promise<CourseEntity[]> {
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
}
