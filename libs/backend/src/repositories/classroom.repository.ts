import ClassroomEntity from '@doorward/common/entities/classroom.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export class ClassroomRepository extends MultiOrganizationRepository<ClassroomEntity> {
  getEntity(): ObjectType<ClassroomEntity> {
    return ClassroomEntity;
  }
}
