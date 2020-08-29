import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';

@Entity('PasswordResets')
export default class PasswordsResetsEntity extends BaseOrganizationEntity {
  @Column({ type: 'text' })
  token: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
