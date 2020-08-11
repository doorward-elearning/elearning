import { DBModel } from '@doorward/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';
import { Course } from './Course';

export class MemberCourse extends Model implements DBModel {
  public id: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  MemberCourse.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
    },
    { sequelize, tableName: 'MemberCourses', paranoid: true }
  );

  return () => {
    MemberCourse.belongsTo(User, {
      foreignKey: 'memberId',
      as: 'member',
    });
    MemberCourse.belongsTo(Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
    return MemberCourse;
  };
};
