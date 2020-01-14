import createReduxStore from '@edudoor/ui/store/createReduxStore';
import login from '../reducers/login';
import courses from '../reducers/courses';
import students from '../reducers/students';
import users from '../reducers/users';
import reports from '../reducers/reports';
import videoCall from '../reducers/videoCall';
import socket from '../reducers/socket';
import teachers from '../reducers/teachers';
import groups from '../reducers/groups';

const store = createReduxStore({
  login,
  courses,
  students,
  users,
  reports,
  videoCall,
  socket,
  teachers,
  groups,
});

const state = store.getState();

export type State = typeof state;

export default store;
