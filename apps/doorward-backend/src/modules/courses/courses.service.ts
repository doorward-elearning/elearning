import { Injectable } from '@nestjs/common';
import CoursesRepository from '../../repositories/courses.repository';
import CreateCourseBody from '@doorward/common/dtos/create.course.body';
import CourseEntity from '@doorward/common/entities/course.entity';
import { Raw } from 'typeorm';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import { CourseStatus } from '@doorward/common/types/courses';
import { ModulesService } from '../modules/modules.service';
import UserEntity from '@doorward/common/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository, private modulesService: ModulesService) {}

  async createCourse(body: CreateCourseBody, author: UserEntity): Promise<CourseEntity> {
    const courseExists = await this.coursesRepository.findOne({
      title: Raw((alias) => `LOWER(${alias}) = LOWER('${body.title.trim()}')`),
    });

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

  async getCoursesForStudent(student: UserEntity){
    const courses = await
  }
}
