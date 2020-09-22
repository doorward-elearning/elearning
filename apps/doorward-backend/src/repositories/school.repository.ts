import ModelRepository from '../utils/model.repository';
import { EntityRepository } from 'typeorm';
import SchoolEntity from '@doorward/common/entities/school.entity';

@EntityRepository(SchoolEntity)
export class SchoolRepository extends ModelRepository<SchoolEntity> {
  async findByName(name: string) {
    return this.findOneByField('name', name);
  }

  async findByEmail(email: string) {
    return this.findOneByField('email', email);
  }

  async findByPhoneNumber(phoneNumber: string) {
    return this.findOneByField('phoneNumber', phoneNumber);
  }
}
