import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import MeetingRoomEntity from './meeting.room.entity';
import UserEntity from './user.entity';
import { MeetingRoles } from '@doorward/common/types/openvidu';
import MeetingRoomMemberModel  from '@doorward/common/models/meeting.room.member.model';

@Entity('MeetingRoomMembers')
export default class MeetingRoomMemberEntity extends BaseOrganizationEntity implements MeetingRoomMemberModel {
  @ManyToOne(() => MeetingRoomEntity, (meetingRoom) => meetingRoom.members, {
    onDelete: 'CASCADE',
  })
  meetingRoom: MeetingRoomEntity;

  @ManyToOne(() => UserEntity, (participant) => participant.meetingRooms, {
    onDelete: 'CASCADE',
  })
  participant: UserEntity;

  @Column({ type: 'enum', enum: MeetingRoles, default: MeetingRoles.PUBLISHER })
  role: MeetingRoles;
}
