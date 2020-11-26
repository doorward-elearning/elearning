import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import MeetingRoomEntity from './meeting.room.entity';
import UserEntity from './user.entity';
import { OPENVIDU_ROLES } from '@doorward/common/types/openvidu';

@Entity('MeetingRoomMembers')
export default class MeetingRoomMemberEntity extends BaseOrganizationEntity {
  @ManyToOne(() => MeetingRoomEntity, (meetingRoom) => meetingRoom.members, {
    onDelete: 'CASCADE',
  })
  meetingRoom: MeetingRoomEntity;

  @ManyToOne(() => UserEntity, (participant) => participant.meetingRooms, {
    onDelete: 'CASCADE',
  })
  participant: UserEntity;

  @Column({ type: 'enum', enum: OPENVIDU_ROLES, default: OPENVIDU_ROLES.PUBLISHER })
  role: OPENVIDU_ROLES;
}
