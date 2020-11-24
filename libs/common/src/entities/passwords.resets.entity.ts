import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import PasswordsResetsModel  from '@doorward/common/models/passwords.resets.model';

@Entity('PasswordResets')
export default class PasswordsResetsEntity extends BaseOrganizationEntity implements PasswordsResetsModel {
  @Column({ type: 'text' })
  token: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
