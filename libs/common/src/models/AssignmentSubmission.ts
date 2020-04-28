import { DBModel } from '@edudoor/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Student } from '@edudoor/common/models/Student';
import { Assignment } from '@edudoor/common/models/Assignment';
import { Teacher } from '@edudoor/common/models/Teacher';
import OrganizationUtils from '../../../../apps/edudoor-node-backend/src/utils/OrganizationUtils';
import { User } from '@edudoor/common/models/User';
import { ModuleItem } from '@edudoor/common/models/ModuleItem';

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
    return AssignmentSubmission;
  };
};
