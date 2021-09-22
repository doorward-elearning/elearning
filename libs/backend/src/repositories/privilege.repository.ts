import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class PrivilegeRepository extends MultiOrganizationRepository<PrivilegeEntity> {
  getEntity(): ObjectType<PrivilegeEntity> {
    return PrivilegeEntity;
  }
}
