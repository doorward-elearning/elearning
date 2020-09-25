import createReduxStore from '@doorward/ui/store/createReduxStore';
import login from '../reducers/login';
import courses from '../reducers/courses';
import students from '../reducers/students';
import users from '../reducers/users';
import reports from '../reducers/reports';
import videoCall from '../reducers/videoCall';
import socket from '../reducers/socket';
import teachers from '../reducers/teachers';
import groups from '../reducers/groups';
import organizations from '../reducers/organizations';
import schools from '../reducers/schools';
import suggestions from '../reducers/suggestions';
import { DoorwardApiReducers } from '../services/apis/doorward.api';

const store = createReduxStore(
  {
    login,
    courses,
    students,
    users,
    reports,
    videoCall,
    socket,
    teachers,
    groups,
    organizations,
    schools,
    suggestions,
  },
  {
    DoorwardApi: DoorwardApiReducers,
  }
);

const state = store.getState();

export type State = typeof state;

export default store;
