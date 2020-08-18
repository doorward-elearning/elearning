import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import CourseEntity from './course.entity';
import { MeetingRoomTypes } from '@doorward/common/types/meeting';

@Entity('MeetingRooms')
export default class MeetingRoomEntity extends BaseOrganizationEntity {
  @Column()
  title: string;

  @Column({ type: 'enum', enum: MeetingRoomTypes })
  type: MeetingRoomTypes;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  members: Array<MeetingRoomMemberEntity>;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.meetingRoom)
  meetings: Array<MeetingEntity>;

  @OneToOne(() => CourseEntity, (course) => course.meetingRoom, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;
}
