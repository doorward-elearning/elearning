import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import MeetingRoomEntity from './meeting.room.entity';
import { MeetingStatus } from '@doorward/common/types/meeting';

@Entity('Meetings')
export default class MeetingEntity extends BaseOrganizationEntity {
  @Column({ nullable: false })
  sessionId: string;

  @Column()
  numParticipants: number;

  @Column({ type: 'enum', enum: MeetingStatus })
  status: MeetingStatus;

  @ManyToOne(() => UserEntity, (host) => host.meetings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hostId' })
  host: UserEntity;

  @ManyToOne(() => MeetingRoomEntity, (meetingRoom) => meetingRoom.meetings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'meetingRoomId' })
  meetingRoom: MeetingRoomEntity;
}
