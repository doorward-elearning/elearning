import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';
import { Course } from './Course';

export class StudentCourse extends Model implements DBModel {
  public id: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  StudentCourse.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
    },
    { sequelize, tableName: 'StudentCourses', paranoid: true }
  );

  return () => {
    StudentCourse.belongsTo(User, {
      foreignKey: 'studentId',
      as: 'student',
    });
    StudentCourse.belongsTo(Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
    return StudentCourse;
  };
};
