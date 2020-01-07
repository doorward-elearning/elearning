import database from '../../config/database';
import { Model, Sequelize } from 'sequelize';
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
import Tools from '@edudoor/common/utils/Tools';
import { ReturnValue } from '@edudoor/common/types';
import { ModelCreator } from '../../types';

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

const env = process.env.NODE_ENV || 'development';
const config = database[env];
const sequelize = new Sequelize(process.env.DATABASE_URL, config);

function createModels<T, K extends keyof T>(
  models: T
): {
  [name in keyof T]?: (new () => ReturnValue<T[name]>) & ReturnValue<T[name]>;
} {
  return Object.keys(models).reduce((acc, modelName) => {
    const model = sequelize.import(modelName, modelNames[modelName]);
    return {
      ...acc,
      [modelName]: model,
    };
  }, {});
}

const models = {
  sequelize,
  Sequelize: sequelize,
  ...createModels(modelNames),
};

Object.keys(modelNames).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
  models[modelName].beforeCreate(model => {
    model.id = Tools.generateId();
  });
});

export type Models = typeof models;

export default models;
