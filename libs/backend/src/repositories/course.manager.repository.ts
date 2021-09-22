import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';

export default class CourseManagerRepository extends MultiOrganizationRepository<CourseManagerEntity> {
  public async courseManagerExists(courseId: string, userId: string) {
    return this.findOne({
      where: {
        course: { id: courseId },
        manager: { id: userId },
      },
    });
  }

  getEntity(): ObjectType<CourseManagerEntity> {
    return CourseManagerEntity;
  }
}
