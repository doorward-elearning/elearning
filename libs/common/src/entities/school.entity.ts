import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import ClassroomEntity from './classroom.entity';

@Entity('Schools')
export default class SchoolEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => ClassroomEntity, (classRoom) => classRoom.school)
  classRooms: Array<ClassroomEntity>;
}
