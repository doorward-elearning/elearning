import UserSessionEntity from '@doorward/common/entities/user.session.entity';
import MultiOrganizationRepository from './multi.organization.repository';
import { FindConditions, ObjectType } from 'typeorm';
import { Roles } from '@doorward/common/types/roles';
import UserEntity from '@doorward/common/entities/user.entity';

export class UserSessionRepository extends MultiOrganizationRepository<UserSessionEntity> {
  /**
   *
   * @param authToken
   */
  async userSessionDelete(user: UserEntity) {
    return await this.softDelete({ user: user, deletedAt: null });
  }
  async getActiveUserSession(user?: UserEntity) {
    return await this.findOne({ user: user });
  }

  getEntity(): ObjectType<UserSessionEntity> {
    return UserSessionEntity;
  }
}