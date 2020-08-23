import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import SchoolEntity from './school.entity';
import MeetingRoomEntity from './meeting.room.entity';

@Entity('Classrooms')
export default class ClassroomEntity extends BaseEntity {
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
