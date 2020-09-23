import { EntityRepository } from 'typeorm';
import CourseEntity from '@doorward/common/entities/course.entity';
import OrganizationBasedRepository from './organization.based.repository';

@EntityRepository(CourseEntity)
export default class CoursesRepository extends OrganizationBasedRepository<CourseEntity> {}
