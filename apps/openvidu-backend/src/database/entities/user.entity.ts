import BaseEntity from './base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { CapabilityEntity } from './capability.entity';
import WhiteboardEntity from './whiteboard.entity';
import MeetingEntity from './meeting.entity';

enum OPENVIDU_ROLES {
  PUBLISHER = 'PUBLISHER',
  SUBSCRIBER = 'SUBSCRIBER',
  MODERATOR = 'MODERATOR',
}

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  avatar: string;

  @Column({
    type: 'enum',
    enum: OPENVIDU_ROLES,
    default: OPENVIDU_ROLES.PUBLISHER,
  })
  role: OPENVIDU_ROLES;

  @Column()
  data: string;

  @Column({ name: 'screen_token' })
  screenToken: string;

  @Column({ name: 'webcam_token' })
  webcamToken: string;

  @Column({ name: 'raising_hand' })
  raisingHand: boolean;

  @ManyToMany(() => CapabilityEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable({ name: 'user_capabilities' })
  capabilities: CapabilityEntity[];

  @OneToOne(() => WhiteboardEntity, { cascade: true, onDelete: 'CASCADE' })
  whiteboard: WhiteboardEntity;

  @ManyToOne(
    () => MeetingEntity,
    meeting => meeting.participants
  )
  @JoinTable()
  meeting: MeetingEntity;
}
