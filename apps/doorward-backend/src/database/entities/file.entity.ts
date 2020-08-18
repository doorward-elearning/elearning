import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';

@Entity('Files')
export default class FileEntity extends BaseOrganizationEntity {
  @Column()
  name: string;

  @Column()
  public: boolean;

  @Column()
  publicUrl: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity;
}
