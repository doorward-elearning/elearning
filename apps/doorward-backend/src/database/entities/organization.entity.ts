import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity('Organizations')
export class User extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;
}
