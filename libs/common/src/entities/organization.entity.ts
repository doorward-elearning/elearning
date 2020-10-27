import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './user.entity';
import Tools from '@doorward/common/utils/Tools';
import RoleEntity from './role.entity';
import { OrganizationModels } from '@doorward/common/types/organization.models';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { Expose } from 'class-transformer';

/**
 * Do not define relationships in this file as it will create cyclic imports.
 */
@Entity('Organizations')
export default class OrganizationEntity {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  link: string;

  @Column({ default: false })
  descriptiveLogo: boolean;

  @Column({ nullable: true })
  darkThemeIcon: string;

  @Column({ enum: MeetingPlatform, type: 'enum', default: MeetingPlatform.OPENVIDU })
  meetingPlatform: MeetingPlatform;

  @Column({ enum: CustomerTypes, type: 'enum', default: CustomerTypes.COLLEGE_INDIA })
  customerType: CustomerTypes;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  users: Array<UserEntity>;

  roles: Array<RoleEntity>;

  @Expose({ groups: ['organization-models'] })
  models: Record<OrganizationModels, Array<string>>;

  @Expose({ groups: ['meeting-config'] })
  meetings: {
    config: {
      base: object;
      moderator: object;
      publisher: object;
    };
    interface: {
      moderator: object;
      publisher: object;
    };
  };

  getDisplayName(model: OrganizationModels) {
    return this.models[model];
  }

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = Tools.generateId();
    }
  }
}
