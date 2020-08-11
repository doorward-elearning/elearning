import BaseEntity from './base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { CapabilityEntity } from './capability.entity';
import WhiteboardEntity from './whiteboard.entity';
import UserEntity from './user.entity';

@Entity({
  name: 'meetings',
})
export default class MeetingEntity extends BaseEntity {
  @Column()
  sessionId: string;

  @Column({ nullable: true })
  darkThemeLogo: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToMany(() => CapabilityEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'meeting_capabilities' })
  capabilities: CapabilityEntity[];

  @OneToMany(
    () => WhiteboardEntity,
    whiteboard => whiteboard.meeting,
    {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  whiteboards: WhiteboardEntity[];

  @OneToMany(
    () => UserEntity,
    user => user.meeting,
    { cascade: true, onDelete: 'CASCADE' }
  )
  participants: UserEntity[];
}
