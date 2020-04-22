import { DataTypes, Model, Sequelize } from 'sequelize';
import { DBModel } from '@edudoor/common/models/DBModel';
import { Classroom } from '@edudoor/common/models/Classroom';

export class School extends Model implements DBModel {
  public id: string;
  public name: string;
  public email: string;
  public phoneNumber: string;

  public readonly classrooms: Array<Classroom>;
  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  School.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'Schools',
      paranoid: true,
    }
  );

  return () => {
    School.hasMany(Classroom, {
      as: 'classrooms',
      foreignKey: 'schoolId',
    });
    return School;
  };
};
