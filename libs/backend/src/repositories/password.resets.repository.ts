import PasswordsResetsEntity from '@doorward/common/entities/passwords.resets.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class PasswordResetsRepository extends MultiOrganizationRepository<PasswordsResetsEntity> {
  getEntity(): ObjectType<PasswordsResetsEntity> {
    return PasswordsResetsEntity;
  }
}
