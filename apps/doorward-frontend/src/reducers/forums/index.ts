import Api from '../../services/api';
import _ from 'lodash';
import {
  ADD_MODULE_ITEM,
  CREATE_FORUM,
  CREATE_FORUM_MANAGER,
  CREATE_FORUM_MODULE,
  CREATE_FORUM_MEMBER,
  DELETE_FORUM,
  DELETE_FORUM_MODULE,
  FETCH_FORUM_MANAGERS,
  FETCH_FORUM_MODULE,
  FETCH_FORUM_MEMBERS,
  FETCH_FORUMS,
  FETCH_MODULE_ITEM,
  FETCH_MEMBERS_NOT_REGISTERED,
  LIST_MODULE_ITEMS,
  REGISTER_MEMBERS,
  REORDER_FORUM_MODULES,
  START_LIVE_CLASSROOM,
  SUBMIT_ASSIGNMENT,
  UN_ENROLL_MEMBER,
  UPDATE_FORUM,
  UPDATE_FORUM_MODULE,
  VIEW_FORUM,
} from './types';
import reducerBuilder, { modifyReducer, reducerApiAction } from '@doorward/ui/reducers/builder';

const createForum = reducerApiAction({
  action: CREATE_FORUM,
  api: Api.forums.create,
  apiMiddleware: {},
});

const forumList = reducerApiAction({
  action: FETCH_FORUMS,
  api: Api.forums.list,
});

const viewForum = reducerApiAction({
  action: VIEW_FORUM,
  api: Api.forums.get,
  reducer: (state, action) => {
    if (action.type === `${CREATE_FORUM_MODULE}_SUCCESS`) {
      return modifyReducer('data.forum.modules', state, action, modules => {
        return [...modules, action.payload.module];
      });
    } else if (action.type === `${REORDER_FORUM_MODULES}_SUCCESS`) {
      return modifyReducer('data.forum.modules', state, action, () => {
        return [...action.payload.modules];
      });
    } else if (action.type === `${DELETE_FORUM_MODULE}_SUCCESS`) {
      return modifyReducer('data.forum.modules', state, action, modules => {
        return [...modules.filter(module => module.id !== action.payload.id)];
      });
    }
    return state;
  },
});

const createModule = reducerApiAction({
  action: CREATE_FORUM_MODULE,
  api: Api.forums.modules.create,
});

const memberList = reducerApiAction({
  action: FETCH_FORUM_MEMBERS,
  api: Api.forums.members.get,
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
  action: FETCH_FORUM_MANAGERS,
  api: Api.forums.managers.get,
});

const createMember = reducerApiAction({
  action: CREATE_FORUM_MEMBER,
  api: Api.forums.members.create,
});

const unEnrollMember = reducerApiAction({
  action: UN_ENROLL_MEMBER,
  api: Api.forums.members.unEnroll,
});

const notRegistered = reducerApiAction({
  action: FETCH_MEMBERS_NOT_REGISTERED,
  api: Api.forums.members.notRegistered,
});

const addModuleItem = reducerApiAction({
  action: ADD_MODULE_ITEM,
  api: Api.forums.modules.items.create,
});

const viewModule = reducerApiAction({
  action: FETCH_FORUM_MODULE,
  api: Api.forums.modules.get,
});

const updateForum = reducerApiAction({
  action: UPDATE_FORUM,
  api: Api.forums.update,
});

const updateModule = reducerApiAction({
  action: UPDATE_FORUM_MODULE,
  api: Api.forums.modules.update,
});

const forumModules = reducerApiAction({
  action: REORDER_FORUM_MODULES,
  api: Api.forums.updateModules,
});

const registerMembers = reducerApiAction({
  action: REGISTER_MEMBERS,
  api: Api.forums.members.register,
});

const launchClassroom = reducerApiAction({
  action: START_LIVE_CLASSROOM,
  api: Api.forums.room.start,
});

const deleteForum = reducerApiAction({
  action: DELETE_FORUM,
  api: Api.forums.delete,
});

const deleteModule = reducerApiAction({
  action: DELETE_FORUM_MODULE,
  api: Api.forums.modules.delete,
});

const moduleItemList = reducerApiAction({
  action: LIST_MODULE_ITEMS,
  api: Api.forums.modules.items.list,
});

const moduleItem = reducerApiAction({
  action: FETCH_MODULE_ITEM,
  api: Api.forums.modules.items.get,
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
  api: Api.forums.modules.items.submitAssignment,
});

const createForumManager = reducerApiAction({
  action: CREATE_FORUM_MANAGER,
  api: Api.forums.managers.create,
});

export default reducerBuilder({
  middleware: {
    createForum,
    forumList,
    viewForum,
    createModule,
    memberList,
    createMember,
    notRegistered,
    addModuleItem,
    viewModule,
    updateForum,
    updateModule,
    forumModules,
    registerMembers,
    launchClassroom,
    deleteForum,
    deleteModule,
    moduleItemList,
    moduleItem,
    submitAssignment,
    createForumManager,
    managersList,
    unEnrollMember,
  },
});
