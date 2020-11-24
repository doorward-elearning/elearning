import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AssignmentSubmissionStatus, AssignmentSubmissionType } from '@doorward/common/types/courses';
import UserEntity from './user.entity';
import ModuleItemEntity from './module.item.entity';
import FileEntity from '@doorward/common/entities/file.entity';
import AssessmentSubmissionModel from '@doorward/common/models/assessment.submission.model';
import AssessmentModel from '@doorward/common/models/assessment.model';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

@Entity('AssignmentSubmissions')
export default class AssignmentSubmissionEntity extends BaseOrganizationEntity implements AssessmentSubmissionModel {
  @Column({ type: 'enum', enum: AssignmentSubmissionType })
  type: AssignmentSubmissionType;

  @Column({ type: 'text' })
  submission: string;

  @Column({ type: 'enum', enum: AssignmentSubmissionStatus, default: AssignmentSubmissionStatus.DRAFT })
  status: AssignmentSubmissionStatus;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  numResubmissions: number;

  @Column({ nullable: true })
  gradedOn: Date;

  @Column({ nullable: true })
  resubmittedOn: Date;

  @Column({ default: 0 })
  grade: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  student: UserEntity;

  @ManyToOne(() => ModuleItemEntity, {
    onDelete: 'CASCADE',
  })
  assignment: AssignmentEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  grader: UserEntity;

  file: FileEntity;
  assessment: AssessmentModel;
  assessmentTime: number;

  submittedOn: Date;
}
