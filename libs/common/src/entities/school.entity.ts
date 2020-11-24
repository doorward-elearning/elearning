import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import ClassroomEntity from './classroom.entity';
import SchoolModel  from '@doorward/common/models/school.model';

@Entity('Schools')
export default class SchoolEntity extends BaseEntity implements SchoolModel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => ClassroomEntity, (classRoom) => classRoom.school)
  classRooms: Array<ClassroomEntity>;
}
