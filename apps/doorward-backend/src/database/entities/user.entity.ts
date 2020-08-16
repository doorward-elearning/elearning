import BaseEntity from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Users')
export default class UserEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  gender: string;
}
