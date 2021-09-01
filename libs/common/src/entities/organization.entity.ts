import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tools from '@doorward/common/utils/Tools';
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
  host: string;

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

  @Column({ nullable: false })
  databaseName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Expose({ groups: ['meeting-config'] })
  meetings: {
    config: {
      base: object;
      moderator: object;
      publisher: object;
      subscriber: object;
    };
    interface: {
      base: object;
      moderator: object;
      publisher: object;
      subscriber: object;
    };
  };

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = Tools.generateId();
    }
  }
}
