import { MeetingRoom } from './MeetingRoom';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { StudentCourse } from './StudentCourse';
import OrganizationUtils from '../../../../apps/doorward-node-backend/src/utils/OrganizationUtils';
import { Student } from './Student';
import { User } from './User';
import { DBModel } from './DBModel';
import { Module } from './Module';
import { CourseManager } from '@doorward/common/models/CourseManager';

export class Course extends Model implements DBModel {
  public id: string;
  public title: string;
  public description?: string;
  public objectives?: string;
  public requirements?: string;
  public status: string;
  public authorId: string;
  public meetingRoomId: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly author: User;
  public readonly modules: Array<Module>;
  public readonly numStudents: string;
  public readonly meetingRoom: MeetingRoom;
  public readonly itemCount: {
    assignments: number;
    quizzes: number;
    pages: number;
  };
  public readonly students: Array<Student>;
}

export default (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      organizationId: DataTypes.STRING,
      objectives: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      tableName: 'Courses',
      sequelize,
      paranoid: true,
      defaultScope: {
        where: {
          organizationId: OrganizationUtils.getId(),
        },
      },
    }
  );

  return () => {
    Course.belongsTo(User, {
      foreignKey: 'createdBy',
      as: 'author',
    });
    Course.hasMany(Module, {
      foreignKey: 'courseId',
      as: 'modules',
    });
    Course.belongsToMany(User, {
      foreignKey: 'courseId',
      as: 'students',
      through: StudentCourse,
    });
    Course.belongsTo(MeetingRoom, {
      foreignKey: 'meetingRoomId',
      as: 'meetingRoom',
    });
    Course.belongsToMany(User, {
      foreignKey: 'courseId',
      otherKey: 'managerId',
      as: 'managers',
      through: CourseManager,
    });
    return Course;
  };
};
