import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Student } from '@doorward/common/models/Student';
import { Assignment } from '@doorward/common/models/Assignment';
import { Teacher } from '@doorward/common/models/Teacher';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { User } from '@doorward/common/models/User';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { File } from '@doorward/common/models/File';

export class AssignmentSubmission extends Model implements DBModel {
  createdAt: Date;
  deletedAt: Date;
  id: string;
  updatedAt: Date;
  studentId: string;
  assignmentId: string;
  reviewerId: string;
  reviewedOn: Date;
  points: number;
  resubmission: boolean;
  submissionType: string;
  submission: string;

  student: Student;
  assignment: Assignment;
  reviewer: Teacher;
  file: File;
}

export default (sequelize: Sequelize) => {
  AssignmentSubmission.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      studentId: DataTypes.STRING,
      assignmentId: DataTypes.STRING,
      reviewerId: DataTypes.STRING,
      reviewedOn: DataTypes.DATE,
      points: DataTypes.INTEGER,
      resubmission: DataTypes.BOOLEAN,
      submissionType: DataTypes.STRING,
      submission: DataTypes.STRING,
    },
    {
      tableName: 'AssignmentSubmissions',
      sequelize,
      paranoid: true,
      defaultScope: {},
    }
  );

  return () => {
    AssignmentSubmission.belongsTo(User, {
      as: 'student',
      foreignKey: 'studentId',
    });
    AssignmentSubmission.belongsTo(User, {
      as: 'reviewer',
      foreignKey: 'reviewerId',
    });
    AssignmentSubmission.belongsTo(ModuleItem, {
      as: 'assignment',
      foreignKey: 'assignmentId',
    });
    AssignmentSubmission.belongsTo(File, {
      as: 'file',
      foreignKey: 'submission',
    });
    return AssignmentSubmission;
  };
};
