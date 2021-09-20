import { BeforeInsert, Column, Entity, getConnection, OneToMany } from 'typeorm';
import Tools from '@doorward/common/utils/Tools';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { Expose } from 'class-transformer';
import BaseEntity from '@doorward/common/entities/base.entity';
import OrganizationConfigEntity from '@doorward/common/entities/OrganizationConfigEntity';
import { OrganizationConfigKey } from '@doorward/common/types/organizationConfig';
import { TaskStatus } from '@doorward/common/types/enums';

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

  @Column({ enum: TaskStatus, type: 'enum', default: TaskStatus.PENDING })
  rolesSetupStatus: TaskStatus;

  @Expose({ groups: ['organization-config'] })
  @OneToMany(() => OrganizationConfigEntity, (config) => config.organization)
  configuration: Array<OrganizationConfigEntity>;

  public getConfiguration(key: OrganizationConfigKey): string {
    if (this.configuration) return this.configuration.find((config) => config.key === key)?.value;
  }

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = Tools.generateId();
    }
    this.name = this.name.toLowerCase();
  }

  getConnection() {
    return getConnection(this.name);
  }
}
