import BaseEntity from './base.entity';
import { AfterLoad, Column, Connection, Entity, OneToMany, OneToOne } from 'typeorm';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import CourseEntity from './course.entity';
import { MeetingRoomTypes, MeetingStatus } from '@doorward/common/types/meeting';

@Entity('MeetingRooms')
export default class MeetingRoomEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'enum', enum: MeetingRoomTypes, default: MeetingRoomTypes.PRIVATE })
  type: MeetingRoomTypes;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  members: Array<MeetingRoomMemberEntity>;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.meetingRoom)
  meetings: Array<MeetingEntity>;

  @OneToOne(() => CourseEntity, (course) => course.meetingRoom, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  currentMeeting: MeetingEntity;

  //TODO: Figure out how to get access to connection here
  // @AfterLoad()
  // async setCurrentMeeting(connection: Connection) {
  //   this.currentMeeting = await this.getRepository(connection, MeetingEntity).findOne({
  //     where: {
  //       status: MeetingStatus.STARTED,
  //       meetingRoom: {
  //         id: this.id,
  //       },
  //     },
  //   });
  // }
}
