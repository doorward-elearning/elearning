import { DBModel } from '@edudoor/common/models/DBModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { School } from '@edudoor/common/models/School';
import { MeetingRoom } from '@edudoor/common/models/MeetingRoom';

export class Classroom extends Model implements DBModel {
  id: string;
  meetingRoomId: string;
  schoolId: string;

  public readonly school: School;
  public readonly meetingRoom: MeetingRoom;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  Classroom.init(
    {
      name: DataTypes.STRING,
      meetingRoomId: DataTypes.STRING,
      schoolId: DataTypes.STRING,
    },
    { sequelize, tableName: 'Classrooms', paranoid: true }
  );

  return () => {
    Classroom.belongsTo(School, {
      as: 'school',
      foreignKey: 'schoolId',
    });
    Classroom.belongsTo(MeetingRoom, {
      as: 'meetingRoom',
      foreignKey: 'meetingRoomId',
    });
    return Classroom;
  };
};
