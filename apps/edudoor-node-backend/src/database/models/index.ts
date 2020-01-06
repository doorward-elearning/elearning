import { environment } from '../../environments/environment';
import database from '../../config/database';
import { Model, DataTypes, Sequelize } from 'sequelize';
import Answer from './Answer';
import Course from './Course';
import Meeting from './Meeting';
import MeetingRoom from './MeetingRoom';
import MeetingRoomMember from './MeetingRoomMember';
import Module from './Module';
import ModuleItem from './ModuleItem';
import Organization from './Organization';
import PasswordResets from './PasswordResets';
import Question from './Question';
import Role from './Role';
import StudentCourse from './StudentCourse';
import User from './User';
import UserRole from './UserRole';

const modelNames = {
  Answer,
  Course,
  Meeting,
  MeetingRoom,
  MeetingRoomMember,
  Module,
  ModuleItem,
  Organization,
  PasswordResets,
  Question,
  Role,
  StudentCourse,
  User,
  UserRole,
};

const env = environment.environment || 'development';
const config = database[env];
const sequelize = new Sequelize(environment.DATABASE_URL, config);

const models: { [name in keyof typeof modelNames]?: typeof Model } & {
  sequelize: Sequelize;
  Sequelize: Sequelize;
} = Object.keys(modelNames).reduce(
  (acc, modelName) => {
    const model = sequelize.import(modelName, modelNames[modelName]);
    return {
      ...acc,
      [modelName]: model,
    };
  },
  { sequelize, Sequelize: sequelize }
);

Object.keys(modelNames).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export type Models = typeof models;

export default models;
