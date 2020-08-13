import Api from '../../services/api';
import _ from 'lodash';
import {
  ADD_MODULE_ITEM,
  CREATE_CONFERENCE,
  CREATE_CONFERENCE_MANAGER,
  CREATE_CONFERENCE_MODULE,
  CREATE_CONFERENCE_MEMBER,
  DELETE_CONFERENCE,
  DELETE_CONFERENCE_MODULE,
  FETCH_CONFERENCE_MANAGERS,
  FETCH_CONFERENCE_MODULE,
  FETCH_CONFERENCE_MEMBERS,
  FETCH_CONFERENCES,
  FETCH_MODULE_ITEM,
  FETCH_MEMBERS_NOT_REGISTERED,
  LIST_MODULE_ITEMS,
  REGISTER_MEMBERS,
  REORDER_CONFERENCE_MODULES,
  START_LIVE_CLASSROOM,
  SUBMIT_ASSIGNMENT,
  UN_ENROLL_MEMBER,
  UPDATE_CONFERENCE,
  UPDATE_CONFERENCE_MODULE,
  VIEW_CONFERENCE,
  CREATE_POLL,
  VOTE_POLL,
} from './types';
import reducerBuilder, { modifyReducer, reducerApiAction } from '@doorward/ui/reducers/builder';

const createConference = reducerApiAction({
  action: CREATE_CONFERENCE,
  api: Api.conferences.create,
  apiMiddleware: {},
});

const conferenceList = reducerApiAction({
  action: FETCH_CONFERENCES,
  api: Api.conferences.list,
});

const viewConference = reducerApiAction({
  action: VIEW_CONFERENCE,
  api: Api.conferences.get,
  reducer: (state, action) => {
    if (action.type === `${CREATE_CONFERENCE_MODULE}_SUCCESS`) {
      return modifyReducer('data.conference.modules', state, action, modules => {
        return [...modules, action.payload.module];
      });
    } else if (action.type === `${REORDER_CONFERENCE_MODULES}_SUCCESS`) {
      return modifyReducer('data.conference.modules', state, action, () => {
        return [...action.payload.modules];
      });
    } else if (action.type === `${DELETE_CONFERENCE_MODULE}_SUCCESS`) {
      return modifyReducer('data.conference.modules', state, action, modules => {
        return [...modules.filter(module => module.id !== action.payload.id)];
      });
    }
    return state;
  },
});

const createModule = reducerApiAction({
  action: CREATE_CONFERENCE_MODULE,
  api: Api.conferences.modules.create,
});

const memberList = reducerApiAction({
  action: FETCH_CONFERENCE_MEMBERS,
  api: Api.conferences.members.get,
  reducer: (state, action) => {
    if (action.type === `${REGISTER_MEMBERS}_SUCCESS`) {
      return modifyReducer('data.members', state, action, members => {
        return _.uniqBy([...members, ...action.payload.members], 'id');
      });
    }
    return state;
  },
});

const managersList = reducerApiAction({
  action: FETCH_CONFERENCE_MANAGERS,
  api: Api.conferences.managers.get,
});

const createMember = reducerApiAction({
  action: CREATE_CONFERENCE_MEMBER,
  api: Api.conferences.members.create,
});

const unEnrollMember = reducerApiAction({
  action: UN_ENROLL_MEMBER,
  api: Api.conferences.members.unEnroll,
});

const notRegistered = reducerApiAction({
  action: FETCH_MEMBERS_NOT_REGISTERED,
  api: Api.conferences.members.notRegistered,
});

const addModuleItem = reducerApiAction({
  action: ADD_MODULE_ITEM,
  api: Api.conferences.modules.items.create,
});

const viewModule = reducerApiAction({
  action: FETCH_CONFERENCE_MODULE,
  api: Api.conferences.modules.get,
});

const updateConference = reducerApiAction({
  action: UPDATE_CONFERENCE,
  api: Api.conferences.update,
});

const updateModule = reducerApiAction({
  action: UPDATE_CONFERENCE_MODULE,
  api: Api.conferences.modules.update,
});

const conferenceModules = reducerApiAction({
  action: REORDER_CONFERENCE_MODULES,
  api: Api.conferences.updateModules,
});

const registerMembers = reducerApiAction({
  action: REGISTER_MEMBERS,
  api: Api.conferences.members.register,
});

const launchClassroom = reducerApiAction({
  action: START_LIVE_CLASSROOM,
  api: Api.conferences.room.start,
});

const deleteConference = reducerApiAction({
  action: DELETE_CONFERENCE,
  api: Api.conferences.delete,
});

const deleteModule = reducerApiAction({
  action: DELETE_CONFERENCE_MODULE,
  api: Api.conferences.modules.delete,
});

const moduleItemList = reducerApiAction({
  action: LIST_MODULE_ITEMS,
  api: Api.conferences.modules.items.list,
});

const moduleItem = reducerApiAction({
  action: FETCH_MODULE_ITEM,
  api: Api.conferences.modules.items.get,
  reducer: (state, action) => {
    if (action.type === `${SUBMIT_ASSIGNMENT}_SUCCESS`) {
      return modifyReducer('data.item', state, action, item => {
        return { ...item, assignmentSubmission: action.payload.submission };
      });
    }
    return state;
  },
});

const submitAssignment = reducerApiAction({
  action: SUBMIT_ASSIGNMENT,
  api: Api.conferences.modules.items.submitAssignment,
});

const createConferenceManager = reducerApiAction({
  action: CREATE_CONFERENCE_MANAGER,
  api: Api.conferences.managers.create,
});

const createPoll = reducerApiAction({
  action: CREATE_POLL,
  api: Api.conferences.polls.create,
});

const votePoll = reducerApiAction({
  action: VOTE_POLL,
  api: Api.conferences.polls.vote,
});

export default reducerBuilder({
  middleware: {
    createConference,
    conferenceList,
    viewConference,
    createModule,
    memberList,
    createMember,
    notRegistered,
    addModuleItem,
    viewModule,
    updateConference,
    updateModule,
    conferenceModules,
    registerMembers,
    launchClassroom,
    deleteConference,
    deleteModule,
    moduleItemList,
    moduleItem,
    submitAssignment,
    createConferenceManager,
    managersList,
    unEnrollMember,
    createPoll,
    votePoll,
  },
});
