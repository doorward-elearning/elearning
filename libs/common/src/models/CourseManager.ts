import { DBModel } from '@doorward/common/models/DBModel';
import { User } from '@doorward/common/models/User';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Course } from '@doorward/common/models/Course';

export class CourseManager extends Model implements DBModel {
  public id: string;
  public managerId: string;
  public courseId: string;
  public enrolledById: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;

  public readonly enrolledBy: User;
  public readonly manager: User;
  public readonly course: Course;
}

export default (sequelize: Sequelize) => {
  CourseManager.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      managerId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      enrolledById: DataTypes.STRING,
    },
    {
      tableName: 'CourseManagers',
      sequelize,
      paranoid: true,
      defaultScope: {},
    }
  );
  return () => {
    CourseManager.belongsTo(User, {
      as: 'manager',
      foreignKey: 'managerId',
    });

    CourseManager.belongsTo(User, {
      as: 'enrolledBy',
      foreignKey: 'enrolledById',
    });

    CourseManager.belongsTo(Course, {
      as: 'course',
      foreignKey: 'courseId',
    });
    return CourseManager;
  };
};
