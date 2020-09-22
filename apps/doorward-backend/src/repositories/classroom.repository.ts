import ModelRepository from '../utils/model.repository';
import ClassroomEntity from '@doorward/common/entities/classroom.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ClassroomEntity)
export class ClassroomRepository extends ModelRepository<ClassroomEntity> {}
