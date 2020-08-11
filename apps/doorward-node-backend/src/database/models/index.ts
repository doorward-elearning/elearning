import database from '../../config/database';
import { Options, Sequelize } from 'sequelize';
import Tools from '@doorward/common/utils/Tools';
import { ReturnValue } from '@doorward/common/types';
import Answer from '@doorward/common/models/Answer';
import Course from '@doorward/common/models/Course';
import Meeting from '@doorward/common/models/Meeting';
import MeetingRoom from '@doorward/common/models/MeetingRoom';
import ModuleItem from '@doorward/common/models/ModuleItem';
import Role from '@doorward/common/models/Role';
import Group from '@doorward/common/models/Group';
import GroupMember from '@doorward/common/models/GroupMember';
import Organization from '@doorward/common/models/Organization';
import User from '@doorward/common/models/User';
import UserRole from '@doorward/common/models/UserRole';
import PasswordResets from '@doorward/common/models/PasswordResets';
import Question from '@doorward/common/models/Question';
import MemberCourse from '@doorward/common/models/MemberCourse';
import MeetingRoomMember from '@doorward/common/models/MeetingRoomMember';
import Module from '@doorward/common/models/Module';
import File from '@doorward/common/models/File';
import AssignmentSubmission from '@doorward/common/models/AssignmentSubmission';
import CourseManager from '@doorward/common/models/CourseManager';
import { ModelCreator } from '../../types';
import OrganizationUtils from '../../utils/OrganizationUtils';
import School from '@doorward/common/models/School';
import ClassRoom from '@doorward/common/models/Classroom';

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
  MemberCourse,
  User,
  UserRole,
  Group,
  GroupMember,
  File,
  AssignmentSubmission,
  School,
  ClassRoom,
  CourseManager,
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

let models = {
  sequelize,
  Sequelize: sequelize,
  ...createModels(modelNames),
};

export function initializeModelQuery() {
  Object.keys(modelNames).forEach(modelName => {
    models[modelName] = models[modelName]();
    models[modelName].beforeCreate(model => {
      model.id = Tools.generateId();
      if (!model.organizationId) {
        model.organizationId = OrganizationUtils.getId();
      }
    });
  });
}

initializeModelQuery();

OrganizationUtils.initialize(models).then(() => {
  models = {
    ...models,
    ...createModels(modelNames),
  };

  initializeModelQuery();
});

export type Models = typeof models;

export default models;
