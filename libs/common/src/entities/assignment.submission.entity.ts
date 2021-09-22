import { Column, Entity, ManyToOne } from 'typeorm';
import { AssignmentSubmissionStatus, AssignmentSubmissionType } from '@doorward/common/types/courses';
import UserEntity from './user.entity';
import ModuleItemEntity from './module.item.entity';
import FileEntity from '@doorward/common/entities/file.entity';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('AssignmentSubmissions')
export default class AssignmentSubmissionEntity extends BaseEntity {
  @Column({ type: 'enum', enum: AssignmentSubmissionType })
  type: AssignmentSubmissionType;

  @Column({ type: 'text' })
  submission: string;

  @Column({ default: 0 })
  points: number;

  @Column({ type: 'enum', enum: AssignmentSubmissionStatus, default: AssignmentSubmissionStatus.DRAFT })
  status: AssignmentSubmissionStatus;

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
  assignment: ModuleItemEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  grader: UserEntity;

  file: FileEntity;
}
