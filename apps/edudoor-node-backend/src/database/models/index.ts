import database from '../../config/database';
import { Options, Sequelize } from 'sequelize';
import Tools from '@edudoor/common/utils/Tools';
import { ReturnValue } from '@edudoor/common/types';
import Answer from '@edudoor/common/models/Answer';
import Course from '@edudoor/common/models/Course';
import Meeting from '@edudoor/common/models/Meeting';
import MeetingRoom from '@edudoor/common/models/MeetingRoom';
import ModuleItem from '@edudoor/common/models/ModuleItem';
import Role from '@edudoor/common/models/Role';
import Group from '@edudoor/common/models/Group';
import GroupMember from '@edudoor/common/models/GroupMember';
import Organization from '@edudoor/common/models/Organization';
import User from '@edudoor/common/models/User';
import UserRole from '@edudoor/common/models/UserRole';
import PasswordResets from '@edudoor/common/models/PasswordResets';
import Question from '@edudoor/common/models/Question';
import StudentCourse from '@edudoor/common/models/StudentCourse';
import MeetingRoomMember from '@edudoor/common/models/MeetingRoomMember';
import Module from '@edudoor/common/models/Module';
import File from '@edudoor/common/models/File';
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
  Group,
  GroupMember,
  File,
};

const env = process.env.NODE_ENV || 'development';
const config = database[env];
const sequelize = new Sequelize(process.env.DATABASE_URL, config as Options);

function createModels<T extends { [name: string]: ModelCreator<any> }, K extends keyof T>(
  models: T
): {
  [name in keyof T]?: (new () => ReturnValue<ReturnValue<T[name]>>) & ReturnValue<ReturnValue<T[name]>>;
} {
  return Object.keys(models).reduce((acc, modelName) => {
    const model = modelNames[modelName](sequelize);
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
  models[modelName] = models[modelName]();
  models[modelName].beforeCreate(model => {
    model.id = Tools.generateId();
  });
});

export type Models = typeof models;

export default models;
