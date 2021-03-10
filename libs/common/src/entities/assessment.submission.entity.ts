import BaseOrganizationEntity from '@doorward/common/entities/base.organization.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import UserEntity from '@doorward/common/entities/user.entity';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';

@Entity({ name: 'AssessmentSubmission' })
export default class AssessmentSubmissionEntity extends BaseOrganizationEntity {
  @Column({ type: 'text' })
  submission: string;

  @Column({ type: 'text', nullable: true })
  submissionResults: string;

  @Column({ default: 0 })
  assessmentTime: number;

  @Column({ type: 'enum', enum: AssessmentSubmissionStatus, default: AssessmentSubmissionStatus.DRAFT })
  status: AssessmentSubmissionStatus;

  @Column({ nullable: true })
  gradedOn: Date;

  @Column({ nullable: true })
  submittedOn: Date;

  @Column({ default: 0 })
  grade: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  student: UserEntity;

  @ManyToOne(() => AssessmentEntity)
  @JoinColumn()
  assessment: AssessmentEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  grader: UserEntity;
}
