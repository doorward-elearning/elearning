import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import MeetingEntity from './meeting.entity';
import UserEntity from './user.entity';

@Entity({ name: 'whiteboards' })
export default class WhiteboardEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  state: string;

  @Column()
  active: boolean;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  createdBy: UserEntity;

  @ManyToOne(
    () => MeetingEntity,
    meeting => meeting.whiteboards
  )
  meeting: MeetingEntity;
}
