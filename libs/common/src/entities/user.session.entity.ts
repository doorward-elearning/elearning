import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';

@Entity('UserSessions')
export default class UserSessionEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ unique: true })
  authToken: string;

}
