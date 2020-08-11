import BaseEntity from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'capabilities' })
export class CapabilityEntity extends BaseEntity {
  @Column()
  capability: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  description: string;
}
