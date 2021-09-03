import SchoolEntity from '@doorward/common/entities/school.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export class SchoolRepository extends MultiOrganizationRepository<SchoolEntity> {
  async findByName(name: string) {
    return this.findOneByField('name', name);
  }

  async findByEmail(email: string) {
    return this.findOneByField('email', email);
  }

  async findByPhoneNumber(phoneNumber: string) {
    return this.findOneByField('phoneNumber', phoneNumber);
  }

  getEntity(): ObjectType<SchoolEntity> {
    return SchoolEntity;
  }
}
