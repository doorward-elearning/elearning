import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import FileModel  from '@doorward/common/models/file.model';

@Entity('Files')
export default class FileEntity extends BaseOrganizationEntity implements FileModel {
  @Column()
  name: string;

  @Column({ default: false })
  public: boolean;

  @Column({ nullable: false })
  publicUrl: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity;
}
