import BaseEntity from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import MeetingRoomMemberEntity from './meeting.room.member.entity';

@Entity('MeetingRooms')
export default class MeetingRoomEntity extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  members: Array<MeetingRoomMemberEntity>;
}
