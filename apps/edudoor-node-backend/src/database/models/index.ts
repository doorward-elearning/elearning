import { environment } from '../../environments/environment';
import Answer from './answer';
import Course from './course';
import Meeting from './meeting';
import MeetingRoom from './meetingRoom';
import MeetingRoomMember from './meetingroommember';
import Module from './module';
import ModuleItem from './moduleitem';
import Organization from './organization';
import PasswordResets from './passwordresets';
import Question from './question';
import Role from './Role';
import StudentCourse from './StudentCourse';
import User from './User';
import UserRole from './UserRole';
import { Sequelize } from 'sequelize';
import Tools from '@edudoor/ui/utils/Tools';

const env = environment.environment || 'development';
const config = require(`${__dirname}/../../config/database.js`)[env];

const modelDefinitions = {
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
const sequelize = new Sequelize(environment.DATABASE_URL, config);

const models = Object.keys(modelDefinitions).reduce((acc, modelName) => {
  const model = sequelize.import(modelName, modelDefinitions[modelName]);
  if (model.associate) {
    model.associate(models);
  }
  model.beforeCreate(model => {
    model.id = Tools.generateId();
  });

  return {
    ...acc,
    [modelName]: model,
  };
}, {});

export default models;
