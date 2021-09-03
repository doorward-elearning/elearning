import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import Tools from '@doorward/common/utils/Tools';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { Expose } from 'class-transformer';
import BaseEntity from '@doorward/common/entities/base.entity';
import OrganizationConfigEntity from '@doorward/common/entities/OrganizationConfigEntity';

/**
 * Do not define relationships in this file as it will create cyclic imports.
 */
@Entity('Organizations')
export default class OrganizationEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  description: string;

  // An Array representing the possible hosts for this organization
  @Column()
  hosts: string;

  @Column({ default: false })
  descriptiveLogo: boolean;

  @Column({ nullable: true })
  darkThemeLogo: string;

  @Column({ enum: MeetingPlatform, type: 'enum', default: MeetingPlatform.OPENVIDU })
  meetingPlatform: MeetingPlatform;

  @Column({ enum: CustomerTypes, type: 'enum', default: CustomerTypes.COLLEGE_INDIA })
  customerType: CustomerTypes;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: false })
  databaseName: string;

  @Expose({ groups: ['organization-config'] })
  @OneToMany(() => OrganizationConfigEntity, (config) => config.organization)
  configuration: Array<OrganizationConfigEntity>;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = Tools.generateId();
    }
    this.name = this.name.toLowerCase();
  }
}
