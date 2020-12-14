import { Injectable, UnauthorizedException } from '@nestjs/common';
import CourseManagerRepository from '@doorward/backend/repositories/course.manager.repository';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { Roles } from '@doorward/common/types/roles';
import { AddCourseManagerBody } from '@doorward/common/dtos/body/course.managers.body';
import translate from '@doorward/common/lang/translate';

@Injectable()
export class ManagersService {
  constructor(private managersRepository: CourseManagerRepository, private usersRepository: UsersRepository) {}

  /**
   *
   * @param courseId
   */
  public async getCourseManagers(courseId: string): Promise<CourseManagerEntity[]> {
    return this.managersRepository.find({
      where: { course: { id: courseId } },
      relations: ['manager', 'creator'],
    });
  }

  public async createCourseManager(
    courseId: string,
    body: AddCourseManagerBody,
    creator: UserEntity
  ): Promise<CourseManagerEntity> {
    let courseManager = await this.managersRepository.courseManagerExists(courseId, body.managerId);

    if (await this.usersRepository.userExistsByRole(courseId, Roles.STUDENT)) {
      throw new UnauthorizedException(translate('studentCannotBeACourseManager'));
    }

    if (!courseManager) {
      courseManager = await this.managersRepository.save(
        this.managersRepository.create({
          manager: { id: body.managerId },
          course: { id: courseId },
          creator,
        })
      );
    }

    return this.managersRepository.findOne(courseManager.id, { relations: ['manager', 'creator'] });
  }
}
