import createReduxStore from '@doorward/ui/store/createReduxStore';
import login from '../reducers/login';
import forums from '../reducers/forums';
import members from '../reducers/members';
import users from '../reducers/users';
import reports from '../reducers/reports';
import videoCall from '../reducers/videoCall';
import socket from '../reducers/socket';
import moderators from '../reducers/moderators';
import groups from '../reducers/groups';
import organizations from '../reducers/organizations';
import schools from '../reducers/schools';
import suggestions from '../reducers/suggestions';

const store = createReduxStore({
  login,
  forums,
  members,
  users,
  reports,
  videoCall,
  socket,
  moderators,
  groups,
  organizations,
  schools,
  suggestions,
});

const state = store.getState();

export type State = typeof state;

export default store;
