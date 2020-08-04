import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity({
  name: 'meetings',
})
export default class MeetingEntity extends BaseEntity {
  @Column()
  sessionId: string;

  @Column()
  sessionTitle: string;

  @Column()
  hostId: string;
}
