import BaseEntity from './base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import CourseEntity from './course.entity';

@Entity('MeetingRooms')
export default class MeetingRoomEntity extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  members: Array<MeetingRoomMemberEntity>;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.meetingRoom)
  meetings: Array<MeetingEntity>;

  @OneToOne(() => CourseEntity, (course) => course.meetingRoom, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;
}
