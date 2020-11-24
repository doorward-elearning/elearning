import BaseOrganizationEntity from './base.organization.entity';
import { AfterLoad, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import CourseEntity from './course.entity';
import { MeetingRoomTypes, MeetingStatus } from '@doorward/common/types/meeting';
import MeetingRoomModel  from '@doorward/common/models/meeting.room.model';

@Entity('MeetingRooms')
export default class MeetingRoomEntity extends BaseOrganizationEntity implements MeetingRoomModel {
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

  @AfterLoad()
  async setCurrentMeeting() {
    this.currentMeeting = await this.getRepository(MeetingEntity).findOne({
      where: {
        status: MeetingStatus.STARTED,
        meetingRoom: {
          id: this.id,
        },
      },
    });
  }
}
