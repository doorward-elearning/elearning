import OrganizationBasedRepository from '../utils/organization.based.repository';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(CourseManagerEntity)
export default class CourseManagerRepository extends OrganizationBasedRepository<CourseManagerEntity> {
  public async courseManagerExists(courseId: string, userId: string) {
    return this.findOne({
      where: {
        course: { id: courseId },
        manager: { id: userId },
      },
    });
  }
}
