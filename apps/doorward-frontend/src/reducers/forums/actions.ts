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
import {
  ForumModuleBody,
  ForumModuleItemBody,
  CreateForumBody,
  CreateForumManagerBody,
  CreateMemberBody,
  RegisterMembersBody,
  SearchQueryBody,
  SubmitAssignmentBody,
  UpdateModulesBody,
} from '../../services/models/requestBody';
import { Action } from '@doorward/ui/reducers/reducers';
import { ModuleItemTypes } from '@doorward/common/models';

export const fetchForumsAction = (): Action => ({
  type: FETCH_FORUMS,
});

export const createForumAction = (body: CreateForumBody, successCallback: () => void): Action => ({
  type: CREATE_FORUM,
  payload: body,
  onSuccess: successCallback,
});

export const fetchForumAction = (forumId: string): Action => ({
  type: VIEW_FORUM,
  payload: [forumId],
});

export const createForumModuleAction = (forumId: string, module: ForumModuleBody): Action => ({
  type: CREATE_FORUM_MODULE,
  payload: [forumId, module],
});

export const fetchForumModuleAction = (moduleId: string) => ({
  type: FETCH_FORUM_MODULE,
  payload: [moduleId],
});

export const fetchForumMemberListAction = (forumId: string): Action => ({
  type: FETCH_FORUM_MEMBERS,
  payload: [forumId],
});

export const unEnrollMemberAction = (memberId: string, forumId: string): Action => ({
  type: UN_ENROLL_MEMBER,
  payload: [memberId, forumId],
});

export const addForumMemberAction = (forumId: string, body: CreateMemberBody): Action => ({
  type: CREATE_FORUM_MEMBER,
  payload: [forumId, body],
});

export const fetchMembersNotRegisteredAction = (forumId: string, query?: SearchQueryBody) => ({
  type: FETCH_MEMBERS_NOT_REGISTERED,
  payload: [forumId, query],
});

export const createForumModuleItemAction = (moduleId: string, item: ForumModuleItemBody): Action => ({
  type: ADD_MODULE_ITEM,
  payload: [moduleId, item],
});

export const updateForumAction = (forumId: string, body: CreateForumBody): Action => ({
  type: UPDATE_FORUM,
  payload: [forumId, body],
});

export const updateForumModuleAction = (moduleId: string, body: ForumModuleBody): Action => ({
  type: UPDATE_FORUM_MODULE,
  payload: [moduleId, body],
});

export const reorderForumModules = (forumId: string, body: UpdateModulesBody): Action => ({
  type: REORDER_FORUM_MODULES,
  payload: [forumId, body],
});

export const registerMembers = (forumId: string, body: RegisterMembersBody): Action => ({
  type: REGISTER_MEMBERS,
  payload: [forumId, body],
});

export const startLiveClassroom = (forumId: string): Action => ({
  type: START_LIVE_CLASSROOM,
  payload: [forumId],
});

export const deleteForumAction = (forumId: string): Action => ({
  type: DELETE_FORUM,
  payload: [forumId],
});

export const deleteForumModuleAction = (moduleId: string): Action => ({
  type: DELETE_FORUM_MODULE,
  payload: [moduleId],
});

export const fetchModuleItems = (forumId: string, type: ModuleItemTypes): Action => ({
  type: LIST_MODULE_ITEMS,
  payload: [forumId, type],
});

export const fetchModuleItem = (itemId: string): Action => ({
  type: FETCH_MODULE_ITEM,
  payload: [itemId],
});

export const submitAssignmentAction = (assignmentId: string, body: SubmitAssignmentBody): Action => ({
  type: SUBMIT_ASSIGNMENT,
  payload: [assignmentId, body],
});

export const createForumManagerAction = (forumId: string, body: CreateForumManagerBody): Action => ({
  type: CREATE_FORUM_MANAGER,
  payload: [forumId, body],
});

export const fetchForumManagersAction = (forumId: string): Action => ({
  type: FETCH_FORUM_MANAGERS,
  payload: [forumId],
});
