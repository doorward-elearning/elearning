import database from '../../config/database';
import { Options, Sequelize } from 'sequelize';
import Tools from '@doorward/common/utils/Tools';
import { ReturnValue } from '@doorward/common/types';
import Answer from '@doorward/common/models/Answer';
import Conference from '@doorward/common/models/Conference';
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
import MemberConference from '@doorward/common/models/MemberConference';
import MeetingRoomMember from '@doorward/common/models/MeetingRoomMember';
import Module from '@doorward/common/models/Module';
import File from '@doorward/common/models/File';
import AssignmentSubmission from '@doorward/common/models/AssignmentSubmission';
import ConferenceManager from '@doorward/common/models/ConferenceManager';
import { ModelCreator } from '../../types';
import OrganizationUtils from '../../utils/OrganizationUtils';
import School from '@doorward/common/models/School';
import ClassRoom from '@doorward/common/models/Classroom';
import Poll from '@doorward/common/models/Poll';
import PollOptions from '@doorward/common/models/PollOptions';
import PollVote from '@doorward/common/models/PollVote';
<<<<<<< HEAD
=======
import ElectionNominees from '@doorward/common/models/ElectionNominees';
import ElectionVote from '@doorward/common/models/ElectionVote';
import Election from '@doorward/common/models/Election';
>>>>>>> 46574434d00d813f9b4aa3576cdc43f4e1494efb

const modelNames = {
  Answer,
  Conference,
  Meeting,
  MeetingRoom,
  MeetingRoomMember,
  Module,
  ModuleItem,
  Organization,
  PasswordResets,
  Question,
  Role,
  MemberConference,
  User,
  UserRole,
  Group,
  GroupMember,
  File,
  AssignmentSubmission,
  School,
  ClassRoom,
  ConferenceManager,
  Poll,
  PollOptions,
  PollVote,
<<<<<<< HEAD
=======
  Election,
  ElectionNominees,
  ElectionVote,
>>>>>>> 46574434d00d813f9b4aa3576cdc43f4e1494efb
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
