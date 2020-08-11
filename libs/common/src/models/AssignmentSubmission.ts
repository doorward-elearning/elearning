import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Member } from '@doorward/common/models/Member';
import { Assignment } from '@doorward/common/models/Assignment';
import { Moderator } from '@doorward/common/models/Moderator';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { User } from '@doorward/common/models/User';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { File } from '@doorward/common/models/File';

export class AssignmentSubmission extends Model implements DBModel {
  createdAt: Date;
  deletedAt: Date;
  id: string;
  updatedAt: Date;
  memberId: string;
  assignmentId: string;
  reviewerId: string;
  reviewedOn: Date;
  points: number;
  resubmission: boolean;
  submissionType: string;
  submission: string;

  member: Member;
  assignment: Assignment;
  reviewer: Moderator;
  file: File;
}

export default (sequelize: Sequelize) => {
  AssignmentSubmission.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      memberId: DataTypes.STRING,
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
      as: 'member',
      foreignKey: 'memberId',
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
