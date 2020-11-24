import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import SchoolEntity from './school.entity';
import MeetingRoomEntity from './meeting.room.entity';
import ClassroomModel from '@doorward/common/models/classroom.model';

@Entity('Classrooms')
export default class ClassroomEntity extends BaseEntity implements ClassroomModel {
  @Column()
  name: string;

  @ManyToOne(() => SchoolEntity, (school) => school.classRooms, {
    onDelete: 'CASCADE',
  })
  school: SchoolEntity;

  @OneToOne(() => MeetingRoomEntity, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'meetingRoomId' })
  meetingRoom: MeetingRoomEntity;
}
